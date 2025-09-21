SELECT 
    p.id AS professor_id,
    p.name AS professor_name,
    SUM(TIMESTAMPDIFF(HOUR, cs.start_time, cs.end_time)) AS total_hours
FROM PROFESSOR p
JOIN SUBJECT s ON p.id = s.taught_by
JOIN CLASS c ON s.id = c.subject_id
JOIN CLASS_SCHEDULE cs ON c.id = cs.class_id
GROUP BY p.id, p.name;

-- SGBD definido para o SQL: PostgreSQL