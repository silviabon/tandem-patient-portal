# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.destroy_all
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')


Soap.destroy_all
Appointment.destroy_all
Allergy.destroy_all
Condition.destroy_all
Prescription.destroy_all
Immunization.destroy_all
Vital.destroy_all
Patient.destroy_all
Provider.destroy_all


kevin = Provider.create!(first_name: 'Kevin', last_name: 'McIntosh', billing_number: 123456)
maria = Provider.create!(first_name: 'Maria', last_name: 'Brown', billing_number: 122051)
logan = Provider.create!(first_name: 'Logan', last_name: 'Smith', billing_number: 193473)

carl = kevin.patients.create!(first_name: 'Carl', last_name: 'McDonald', dob: '1977-01-30', personal_health_number: 801759268, telephone: 6055943726, email: 'carl@gmail.com', password: '123', sex: 'male')
sarah = kevin.patients.create!(first_name: 'Sarah', last_name: 'Wilson', dob: '1949-10-03', personal_health_number: 809457368, telephone: 6054876396, email: 'sarah@gmail.com', password: '123', sex: 'female')

carl.vitals.create!(bp_s: 40, bp_d: 90, weight_kg: 80, height_cm: 177, temperature_c: 36, pulse: 90, bmi: 27, date: '2018-10-01')
sarah.vitals.create!(bp_s: 40, bp_d: 90, weight_kg: 60, height_cm: 157, temperature_c: 36, pulse: 98, bmi: 24, date: '2018-09-28')
sarah.vitals.create!(bp_s: 40, bp_d: 90, weight_kg: 62, height_cm: 157, temperature_c: 36, pulse: 90, bmi: 24, date: '2018-03-14')

sarah.immunizations.create!(name: 'Rubeola', dose: '1mg', date: '2010-09-18')
carl.immunizations.create!(name: 'Polio', dose: '1mg', date: '2000-02-10')

sarah.prescriptions.create!(name: 'Penicilin', dose: '10mg', quantity: '10 caps', refill: 0, route: 'oral', date: '2018-03-14')
sarah.prescriptions.create!(name: 'Amoxicilin', dose: '10mg', quantity: '30 caps', refill: 1, route: 'oral', date: '2018-04-10')
carl.prescriptions.create!(name: 'Amoxicilin', dose: '10mg', quantity: '30 caps', refill: 0, route: 'oral', date: '2017-09-10')

sarah.conditions.create!(name: 'High blood pressure')
c1 = carl.conditions.create!(name: 'Diabetes')

sarah.allergies.create!(name: 'Ibuprofen', severity: 'Mild')
carl.allergies.create!(name: 'Peanuts', severity: 'Severe')

app1 = sarah.appointments.create!(provider: kevin, date: '2015-11-12', time: '11:00', patient_summary: 'I have a cold', concern: 'cold', status: 'completed')
app2 = sarah.appointments.create!(provider: kevin, date: '2019-01-03', time: '18:00', patient_summary: 'I have a headache', concern: 'headache', status: 'upcoming')
app3 = carl.appointments.create!(provider: kevin, date: '2016-07-03', time: '9:00', patient_summary: 'I have a stomach pain', concern: 'stomach pain', status: 'completed', condition: c1)
app4 = carl.appointments.create!(provider: kevin, date: '2019-03-03', time: '10:00', patient_summary: 'I have a stomach pain again', concern: 'stomach pain', status: 'upcoming')

Soap.create!(provider: kevin, appointment: app1, doctor_summary: 'He is faking it')
