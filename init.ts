/// <reference path="./App/project.ts" />
/// <reference path="./App/report.ts" />


function onOpen(e) {
    // Add a custom menu to the spreadsheet.
    SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
        .createMenu('Evalauciacón docente')
        .addItem('Limpiar tablas', 'PROJECT.clean')
        .addItem('Reasignar preguntas y encabezados', 'PROJECT.set_questions_and_headers')
        .addItem('Generar reporte', 'REPORT.EXECUTOR')
        .addToUi();
}