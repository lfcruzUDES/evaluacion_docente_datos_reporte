/// <reference path="../Models/Models.ts" />
/// <reference path="../UI/alerts.ts" />
/// <reference path="../Settings.ts" />


namespace PROJECT {

    /**
     * Limpia las tablas Datos, Participantes, Respuestas y Reporte
     */
    export function clean() {
        let continue_process = ALERTS.confirm_yes_no(SpreadsheetApp, 'Voy a limpiar todas las tablas excepto la de preguntas. ¿Estás de acuerdo?');
        if (continue_process) {
            let datas = MODELS.DatasModel();
            clean_range(datas.sheet, 2)

            let participants = MODELS.ParticipantsModel();
            clean_range(participants.sheet, 2)

            let responses = MODELS.GenericModel(SETTINGS.RESPONSES);
            clean_range(responses.sheet, 1)

            let report = MODELS.GenericModel(SETTINGS.REPORT);
            clean_range(report.sheet, 1)
        }
    }

    /**
     * Ejecuta la limpieza de los rangos.
     * @param sheet (GoogleAppsScript.Spreadsheet.Sheet): Hoja que va a limpiarse.
     * @param start_row (number): número de fila desde el que va a comenzar la limpieza.
     */
    function clean_range(sheet: GoogleAppsScript.Spreadsheet.Sheet, start_row: number) {
        try {
            sheet.getRange(start_row, 1, sheet.getLastRow(), sheet.getLastColumn()).clear();
        } catch (error) {
            Logger.log(error);
        }
    }

    /**
     * Establece como encabezados de columnas de las hojas
     * de Respuestas y de Reporte las preguntas de la hoja
     * de Preguntas.
     */
    export function set_questions_and_headers() {
        let continue_process = ALERTS.confirm_yes_no(SpreadsheetApp, 'Voy a reasignar preguntas y encabezados de las hojas. ¿Estás de acuerdo?');
        if (continue_process) {
            let responses = MODELS.GenericModel(SETTINGS.RESPONSES);
            let report = MODELS.GenericModel(SETTINGS.REPORT);
            let questions = MODELS.QuestionsModel();
            set_headers_and_font(questions.sheet, SETTINGS.QUESTIONS_HEADERS);
            let datas = MODELS.DatasModel();
            set_headers_and_font(datas.sheet, SETTINGS.DATAS_HEADERS);
            let participants = MODELS.ParticipantsModel();
            set_headers_and_font(participants.sheet, SETTINGS.PARTICIPANTS_HEADERS);

            let headers_responses_report = [];
            for (const col of responses.cols) {
                headers_responses_report.push(col.verbose_name);
            }

            let response_headers = headers_responses_report.slice(0);
            response_headers.push('Estatus');
            set_headers_and_font(responses.sheet, response_headers);
            set_headers_and_font(report.sheet, headers_responses_report);
        }
    }


    function set_headers_and_font(sheet: GoogleAppsScript.Spreadsheet.Sheet, headers: string[]) {
        let range = sheet.getRange(1, 1, 1, headers.length);
        range.setFontWeight("bold");
        range.setValues([headers]);
    }

}