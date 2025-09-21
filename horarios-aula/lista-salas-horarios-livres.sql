-- ALista de salas com horários livres e ocupados
-- 

SELECT 
    r.id AS room_id,
    r.name AS room_name,
    cs.day_of_week,
    cs.start_time,
    cs.end_time
FROM 
    ROOM r
LEFT JOIN 
    CLASS_SCHEDULE cs ON cs.room_id = r.id
ORDER BY 
    r.id, cs.day_of_week, cs.start_time;

-- SGBD definido para o SQL: PostgreSQL