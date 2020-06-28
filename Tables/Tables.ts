namespace TABLES {

    type col = {
        name: string,
        data_type: string,
        col?: string,
        verbose_name?: string,
        default?: any,
        // Choices [any, any ...]
        choices?: {},
        max?: number,
        min?: number,
        auto_add?: any,
    }

    export const QUESTIONS_TABLE: col[] = [
        { name: "question", data_type: 'string', verbose_name: 'Pregunta' },
        { name: "type", data_type: 'string', verbose_name: 'Tipo' },
        { name: "options", data_type: 'string', verbose_name: 'Opciones' },
        { name: "required", data_type: 'string', verbose_name: 'Requerido' },
    ];


    export const PARTICIPANTS_TABLE: col[] = [
        { name: "datetime", data_type: 'datetime', verbose_name: 'Marca temporal', auto_add: new Date() },
        { name: "email", data_type: 'string', verbose_name: 'Correo' },
    ];


    export const DATAS_TABLE: col[] = [
        { name: "academic_year", data_type: 'string', verbose_name: 'AÑO PER. ACA.' },
        { name: "period", data_type: 'string', verbose_name: 'PERIODO' },
        { name: "study_plan_year", data_type: 'string', verbose_name: 'AÑO PLAN ESTUDIO' },
        { name: "id_academic_offert", data_type: 'string', verbose_name: 'ID OFERTA ACADÉMICA' },
        { name: "academic_offert", data_type: 'string', verbose_name: 'DESC. OFERTA ACADÉMICA' },
        { name: "grade", data_type: 'number', verbose_name: 'NOP' },
        { name: "subject_id", data_type: 'string', verbose_name: 'ID ASIGNATURA' },
        { name: "subject", data_type: 'string', verbose_name: 'ASIGNATURA' },
        { name: "group", data_type: 'string', verbose_name: 'GRUPO' },
        { name: "teacher_id", data_type: 'string', verbose_name: 'MATRÍCULA' },
        { name: "teacher", data_type: 'string', verbose_name: 'PROFESOR' },
    ];

    export const GENERIC_TABLE_BASE: col[] = [
        { name: "academic_offert", data_type: 'string', verbose_name: 'Oferta académica' },
        { name: "grade", data_type: 'number', verbose_name: 'Grado' },
        { name: "group", data_type: 'string', verbose_name: 'Grupo' },
        { name: "subject", data_type: 'string', verbose_name: 'Asignatura' },
        { name: "teacher", data_type: 'string', verbose_name: 'Profesor' },
    ];
}
