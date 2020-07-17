/// <reference path="../Models/Models.ts" />
/// <reference path="../Settings.ts" />

/**
 *
 */
function analise_responses() {
    REPORT.compare_data_and_responses();
}

namespace REPORT {

    /**
     * Prepara la hoja de reporte, esto es,
     * agrega las materias y la formula de promedio.
     */
    export function prepare_report_sheet() {
        let report = MODELS.GenericModel(SETTINGS.REPORT);
        let data = MODELS.DatasModel();
        let table = MODELS.GenericTableConstructor(SETTINGS.REPORT);
        let cells_to_averange = get_cells_number_type(table);

        let value_to_evaluate = report.sheet.getDataRange().getValues();
        if (value_to_evaluate.length <= 1) {
            let data_subjects = data.all();
            let row = 2
            for (const subject of data_subjects) {
                let row_to_report = {
                    academic_offert: subject.datas.academic_offert,
                    grade: subject.datas.grade,
                    group: subject.datas.group,
                    subject: subject.datas.subject,
                    teacher: subject.datas.teacher,
                    average: get_ranges_to_prom(report.sheet, row, cells_to_averange)
                }

                report.create(row_to_report);
                row++;
            }
        }
    }


    /**
     * Revisa las respuestas y acumula los resultados en la
     * hoja de reporte.
     */
    export function compare_data_and_responses() {
        let report = MODELS.GenericModel(SETTINGS.REPORT);
        let report_values = report.sheet.getDataRange().getValues();

        let responses = MODELS.GenericModel(SETTINGS.RESPONSES);
        let responses_values = responses.sheet.getDataRange().getValues();

        let table = MODELS.GenericTableConstructor(SETTINGS.RESPONSES);

        if (responses_values.length > 0) {

            // Itera en la hoja de reporte. >>>
            for (let i = 1; i < report_values.length; i++) {
                let report_row = report_values[i];
                report_row.pop();
                // Itera en las respuestas. >>>
                for (let j = 1; j < responses_values.length; j++) {
                    let resposte_row = responses_values[j];

                    if (report_row[0] === resposte_row[0] && report_row[1] === resposte_row[1]
                        && report_row[2] === resposte_row[2] && report_row[3] === resposte_row[3]
                        && !resposte_row[table.length - 1]) {

                        // Itera en la tabla genética. >>>
                        report_row[report_row.length - 1]++;
                        for (let k = 5; k < table.length - 1; k++) {
                            if (resposte_row[k]) {
                                let item_table = table[k];
                                if (item_table.data_type === 'number') {
                                    report_row[k] += Number(resposte_row[k]);
                                } else {
                                    report_row[k] += `|| ${String(resposte_row[k])} `;
                                }
                            }
                        }
                        // Itera en la tabla genética. <<<
                        resposte_row[table.length - 1] = true;
                        responses.sheet.getRange(j + 1, 1, 1, resposte_row.length).setValues([resposte_row]);

                    }
                }
                // Itera en las respuestas. <<<
                report.sheet.getRange(i + 1, 1, 1, report_row.length).setValues([report_row])
            }
            // Itera en la hoja de reporte. <<<

        }

    }

    /**
     * Obtiene los números de columna de las columnas llamadas
     * number y average
     * @param cols 
     */
    function get_cells_number_type(cols: {}[]) {
        let cells = [];
        for (let i = 5; i < cols.length; i++) {
            if (cols[i].data_type === 'number' && cols[i].name !== 'average') {
                cells.push(i + 1);
            }
        }
        return cells;
    }

    /**
     * Obtiene los rangos para el promedio
     * @param sheet 
     * @param row 
     * @param cells 
     */
    function get_ranges_to_prom(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, cells: number[]) {
        let formula = `=AVERAGEA(`;
        for (let i = 0; i < cells.length - 1; i++) {
            let range = sheet.getRange(row, cells[i]).getA1Notation();
            formula += range + ',';
        }

        let range_divisor = sheet.getRange(row, cells[cells.length - 1]).getA1Notation();
        formula = formula.substring(0, formula.length - 1) + `) / ${range_divisor}`;
        return formula;
    }

    /**
     * Realiza el promedio de cada columna
     */
    export function average_by_column() {

        const cols_excluded = 'academic_offert grade group subject teacher counter average';

        let report = MODELS.GenericModel(SETTINGS.REPORT);
        let rows = report.all();
        for (const row of rows) {
            let values = row.datas
            for (const key in values) {
                if (cols_excluded.indexOf(key) < 0) {
                    if (String(Number(values[key]) * 1) !== 'NaN' && values[key]) {
                        if (values[key] !== '#NUM!' && values[key] !== 'NaN') {
                            try {
                                values[key] = Number(values[key]) / Number(values['counter']);
                            } catch (error) {
                                values[key] = '';
                            }
                        }
                    }
                }
            }

            row.save();
        }
    }
}