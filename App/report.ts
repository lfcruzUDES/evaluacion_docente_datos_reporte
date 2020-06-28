/// <reference path="../Models/Models.ts" />
/// <reference path="../Settings.ts" />

namespace REPORT {

    export function EXECUTOR() {
        prepare_report_sheet();
        compare_data_and_responses();
    }

    function prepare_report_sheet() {
        let report = MODELS.GenericModel(SETTINGS.REPORT);
        let data = MODELS.DatasModel();
        let value_to_evaluate = report.sheet.getDataRange().getValues();
        if (value_to_evaluate.length <= 1) {
            let data_subjects = data.all();
            for (const subject of data_subjects) {
                let row_to_report = {
                    academic_offert: subject.datas.academic_offert,
                    grade: subject.datas.grade,
                    group: subject.datas.group,
                    subject: subject.datas.subject,
                    teacher: subject.datas.teacher
                }

                report.create(row_to_report);
            }
        }
    }


    function compare_data_and_responses() {
        let report = MODELS.GenericModel(SETTINGS.REPORT);
        let report_values = report.sheet.getDataRange().getValues();

        let responses = MODELS.GenericModel(SETTINGS.RESPONSES);
        let responses_values = responses.sheet.getDataRange().getValues();

        let table = MODELS.GenericTableConstructor(SETTINGS.REPORT);
        let cells_to_averange = get_cells_number_type(table);

        if (responses_values.length > 0) {

            // Itera en la hoja de reporte. >>>
            for (let i = 1; i < report_values.length; i++) {
                let report_row = report_values[i];
                let counter = 0
                // Itera en las respuestas. >>>
                for (let j = 0; j < responses_values.length; j++) {
                    let resposte_row = responses_values[j];

                    if (report_row[0] === resposte_row[0] && report_row[1] === resposte_row[1]
                        && report_row[2] === resposte_row[2] && report_row[3] === resposte_row[3]
                        && !resposte_row[table.length - 1]) {
                        counter++;
                        // Itera en la tabla genética. >>>
                        for (let k = 5; k < table.length - 2; k++) {
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
                report_row[report_row.length - 2] = counter;
                report_row[report_row.length - 1] = get_ranges_to_prom(report.sheet, i + 1, cells_to_averange);
                report.sheet.getRange(i + 1, 1, 1, report_row.length).setValues([report_row])
            }
            // Itera en la hoja de reporte. <<<

        }

    }


    function get_cells_number_type(cols: {}[]) {
        let cells = [];
        for (const cell of cols) {
            if (cell.type === 'number') {
                cells.push(cell.col);
            }
        }

        return cells;
    }

    function get_ranges_to_prom(sheet:GoogleAppsScript.Spreadsheet.Sheet, row: number, cells: number[]) {
        let formula = `=PROMEDIOA(`;
        for (const cell of cells) {
            let range = sheet.getRange(row, cell).getA1Notation();
            formula += range + ',';
        }
        formula = formula.substring(0, formula.length - 2);
        return formula + ')';
    }

}