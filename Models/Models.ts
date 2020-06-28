/// <reference path="../Tables/Tables.ts" />
/// <reference path="../GSS/sheet.ts" />
/// <reference path="../Settings.ts" />


namespace MODELS {

    /**
     * Modelo de la hoja de preguntas.
     */
    export function QuestionsModel() {
        class Questions_Model extends SHEET.ModelSheet {
            id_url_booK = SETTINGS.BOOK;
            sheet_name = SETTINGS.QUESTIONS;
            cols = TABLES.QUESTIONS_TABLE;

            constructor() {
                super();
                this.make();
            }
        }

        return new Questions_Model();
    }

    /**
     * Modelo de la hoja de Participantes.
     */
    export function ParticipantsModel() {
        class Participants_Model extends SHEET.ModelSheet {
            id_url_booK = SETTINGS.BOOK;
            sheet_name = SETTINGS.PARTICIPANTS;
            cols = TABLES.PARTICIPANTS_TABLE;

            constructor() {
                super();
                this.make();
            }
        }

        return new Participants_Model();
    }

    /**
     * Modelo de la hoja de Datos.
     */
    export function DatasModel() {
        class Datas_Model extends SHEET.ModelSheet {
            id_url_booK = SETTINGS.BOOK;
            sheet_name = SETTINGS.DATAS;
            cols = TABLES.DATAS_TABLE;

            constructor() {
                super();
                this.make();
            }
        }

        return new Datas_Model();
    }

    /**
    * Modelo de la hoja de Respuestas.
    */
    export function GenericModel(name_sheet: string) {
        class Generic_Model extends SHEET.ModelSheet {
            id_url_booK = SETTINGS.BOOK;
            sheet_name = name_sheet;
            cols = GenericTableConstructor(name_sheet);

            constructor() {
                super();
                this.make();
            }
        }

        return new Generic_Model();
    }

    /**
  * Crea una tabla según las preguntas de la hoja
  * de preguntas.
  */
    export function GenericTableConstructor(sheet_name?: string) {
        let generic = [...TABLES.GENERIC_TABLE_BASE];
        let questions = QuestionsModel();
        let values = questions.all();
        for (let i = 5; i < values.length; i++) {
            const row = values[i];
            let name = `question_${i}`;
            let data_type = values[i].datas.type === 'range' ? 'number' : 'string';
            let verbose_name = values[i].datas.question;
            let default_data = values[i].datas.type === 'range' ? 0 : '';
            generic.push(
                { name: name, data_type: data_type, verbose_name: verbose_name, default: default_data },
            )
        }

        if (sheet_name === 'Respuestas') {
            generic.push(
                { name: 'status', data_type: 'string', verbose_name: 'Estatus' },
            )
        } else if (sheet_name === 'Reporte') {
            generic.push(
                { name: 'counter', data_type: 'number', verbose_name: 'Respuestas', default: 0 },
                { name: 'average', data_type: 'string', verbose_name: 'Promedio', default: 0 }
            )
        }

        return generic;
    }

}