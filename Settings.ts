namespace SETTINGS {

    // Libro de tests
    // export const BOOK = 'https://docs.google.com/spreadsheets/d/1JJaxU6BwZ9UVV7HvOmOnK_MUy_QlCcoKuBHyTGLLg0I/edit';
    export const BOOK = 'https://docs.google.com/spreadsheets/d/1vhAO1kvo-Vi25tsRhhp9VnMfzaNOnVOoxgaDrxHjqDU/edit';

    export const QUESTIONS = 'Preguntas';
    export const QUESTIONS_HEADERS = ['PREGUNTA', 'TIPO', 'OPCIONES', 'Requerido'];

    export const DATAS = 'DATOS';
    export const DATAS_HEADERS = ['AÑO PER. ACA.', 'PERIODO', 'AÑO PLAN ESTUDIO', 'ID OFERTA ACADÉMICA', 'DESC. OFERTA ACADÉMICA', 'NOP', 'ID ASIGNATURA', 'ASIGNATURA', 'GRUPO', 'MATRÍCULA', 'PROFESOR'];

    export const PARTICIPANTS = 'Participantes';
    export const PARTICIPANTS_HEADERS = ['Marca temporal', 'Correo'];

    export const RESPONSES = 'Respuestas';
    export const RESPONSES_HEADERS_BASE = ['Oferta académica', 'Grado', 'Grupo', 'Asignatura', 'Profesor'];

    export const REPORT = 'Reporte';
    export const REPORT_HEADERS_BASE = ['Oferta académica', 'Grado', 'Grupo', 'Asignatura', 'Profesor'];

    export const QUESTION_TYPES = {
        immutable: 'immutable',
        textarea: 'TextareaField',
        range: 'InputField'
    }

    /**
     * Ejemplo:
     * PREGUNTA	TIPO	OPCIONES	Requerido
     * Oferta académica	immutable
     * Grado	immutable
     * Grupo	immutable
     * Asignatura	immutable
     * Profesor	immutable
     * Pregunta de rango	range	1-5///Mal//Excelente	VERDADERO
     * Pregunta abierta	textarea	Déjanos tus comentarios.
     */
}