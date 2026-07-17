-- Set the weekly lesson schedule for the three active lesson products.
-- Run this in the Supabase SQL editor.
--
-- Applies to:
-- - private-surf   (Private Lesson)      -> exclusive, capacity = its own max_capacity
-- - semi-private   (Semi-Private Lesson) -> exclusive, capacity 3
-- - group          (Group Surf Lesson)   -> shared,    capacity 8
--
-- Schedule (all): Monday–Sunday at 8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM, 4:00 PM
-- day_of_week is ISO: 1 = Monday … 7 = Sunday.
-- Safe to re-run (deletes this schedule first, then re-inserts / upserts).

begin;

-- Clear existing weekly slots for these three products
delete from weekly_slots
where class_type_id in ('private-surf', 'semi-private', 'group');

-- Private Lesson — exclusive (dedicated session; capacity taken from the product's max_capacity)
insert into weekly_slots (class_type_id, day_of_week, start_time, capacity, booking_mode)
select 'private-surf', days.day_of_week, times.start_time::time,
       coalesce((select max_capacity from class_types where id = 'private-surf'), 2), 'exclusive'
from (values (1),(2),(3),(4),(5),(6),(7)) as days(day_of_week)
cross join (values ('08:00:00'),('10:00:00'),('12:00:00'),('14:00:00'),('16:00:00')) as times(start_time)
on conflict (class_type_id, day_of_week, start_time)
do update set capacity = excluded.capacity, booking_mode = excluded.booking_mode;

-- Semi-Private Lesson — exclusive (just your own group takes the slot; up to 3 people)
insert into weekly_slots (class_type_id, day_of_week, start_time, capacity, booking_mode)
select 'semi-private', days.day_of_week, times.start_time::time, 3, 'exclusive'
from (values (1),(2),(3),(4),(5),(6),(7)) as days(day_of_week)
cross join (values ('08:00:00'),('10:00:00'),('12:00:00'),('14:00:00'),('16:00:00')) as times(start_time)
on conflict (class_type_id, day_of_week, start_time)
do update set capacity = excluded.capacity, booking_mode = excluded.booking_mode;

-- Group Surf Lesson — shared (several bookings share the session, up to capacity 8)
insert into weekly_slots (class_type_id, day_of_week, start_time, capacity, booking_mode)
select 'group', days.day_of_week, times.start_time::time, 8, 'shared'
from (values (1),(2),(3),(4),(5),(6),(7)) as days(day_of_week)
cross join (values ('08:00:00'),('10:00:00'),('12:00:00'),('14:00:00'),('16:00:00')) as times(start_time)
on conflict (class_type_id, day_of_week, start_time)
do update set capacity = excluded.capacity, booking_mode = excluded.booking_mode;

commit;

-- Optional check (should be 105 rows = 3 products × 7 days × 5 times):
-- select class_type_id, day_of_week, start_time, capacity, booking_mode
-- from weekly_slots
-- where class_type_id in ('private-surf', 'semi-private', 'group')
-- order by class_type_id, day_of_week, start_time;
