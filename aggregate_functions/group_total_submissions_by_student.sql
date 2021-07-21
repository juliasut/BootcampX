SELECT students.name as student, count(*) as total_submissions
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.end_date is NULL
GROUP BY students.name;