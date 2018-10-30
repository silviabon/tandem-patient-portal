# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.destroy_all
AdminUser.create!(email: "admin@example.com", password: "password", password_confirmation: "password")

Soap.destroy_all
Appointment.destroy_all
Allergy.destroy_all
Condition.destroy_all
Prescription.destroy_all
Immunization.destroy_all
Vital.destroy_all
Patient.destroy_all
Provider.destroy_all

stephanie = Provider.create!(first_name: "Stephanie", last_name: "Park", billing_number: 123456)

sandra = stephanie.patients.create!(first_name: "Sandra", last_name: "McDonald", dob: "1977-01-30", personal_health_number: 801759268, telephone: 6055943726, email: "sandra@gmail.com", password: "123", sex: "female")
sarah = stephanie.patients.create!(first_name: "Sarah", last_name: "Wilson", dob: "1949-10-03", personal_health_number: 809457368, telephone: 6054876396, email: "sarah@gmail.com", password: "123", sex: "female")

ethel = stephanie.patients.create!(first_name: "Ethel", last_name: "Salters", dob: "1949-10-03", personal_health_number: 809857368, telephone: 6044876396, email: "ethelh@gmail.com", password: "123", sex: "female")
gayle = stephanie.patients.create!(first_name: "Gayle", last_name: "Giordano", dob: "1979-10-03", personal_health_number: 709857368, telephone: 7784876396, email: "gael@gmail.com", password: "123", sex: "female")

 

sandra.vitals.create!(bp_s: 140, bp_d: 90, weight_kg: 80, height_cm: 177, temperature_c: 36.1, pulse: 90, bmi: 27, date: "2018-10-01")
sandra.vitals.create!(bp_s: 130, bp_d: 90, weight_kg: 80.5, height_cm: 177, temperature_c: 36.3, pulse: 100, bmi: 20, date: "2018-10-05")
sarah.vitals.create!(bp_s: 40, bp_d: 90, weight_kg: 60, height_cm: 157, temperature_c: 36, pulse: 98, bmi: 24, date: "2018-09-28")
sarah.vitals.create!(bp_s: 40, bp_d: 90, weight_kg: 62, height_cm: 157, temperature_c: 36, pulse: 90, bmi: 24, date: "2018-03-14")

gayle.vitals.create!(bp_s: 130, bp_d: 90, weight_kg: 52, height_cm: 177, temperature_c: 36, pulse: 90, bmi: 18, date: "2018-02-14")
ethel.vitals.create!(bp_s: 120, bp_d: 90, weight_kg: 70.5, height_cm: 167, temperature_c: 36.5, pulse: 105, bmi: 22, date: "2018-10-18")

sandra.immunizations.create!(name: "Influenza", dose: "0.5mL", date: "2018-09-10")
sarah.immunizations.create!(name: "Rubeola", dose: "1mg", date: "2010-09-18")

sandra.prescriptions.create!(name: "Amoxicilin", dose: "10mg", quantity: "30 caps", refill: 0, route: "oral", date: "2017-09-10")
sandra.prescriptions.create!(name: "Prozac", dose: "10mg", quantity: "30 caps", refill: 3, route: "oral", date: "2017-09-10")
sarah.prescriptions.create!(name: "Penicilin", dose: "10mg", quantity: "10 caps", refill: 0, route: "oral", date: "2018-03-14")

c0 = sandra.conditions.create!(id: 0, name: "")
c1 = sandra.conditions.create!(name: "Diabetes")
c2 = sandra.conditions.create!(name: "High Blood Pressure")
c3 = sandra.conditions.create!(name: "Depression")
sarah.conditions.create!(name: "Anxiety")

sandra.allergies.create!(name: "Ibuprofen", severity: "Mild")
sarah.allergies.create!(name: "Peanuts", severity: "Severe")

app1 = sandra.appointments.create!(provider: stephanie, date: "2016-07-03", time: "9:00AM", concern: "Foot numbness", app_type: "Follow-up", concern_desc: "Been having ongoing foot numbness for the past few weeks. Having a hard time walking", symptoms: "numbness,pain", other_symptoms: "balance problems", temp: "36", heart_rate: "95", bp: "130/90", q1: "Why are my feet going numb?", q2: "Can I take anything for the pain?", status: "completed", condition: c1)
app2 = sandra.appointments.create!(provider: stephanie, date: "2018-11-03", time: "9:00AM", concern: "High blood pressure", app_type: "Follow-up", concern_desc: "Been getting high blood pressure reading over the past two weeks. Averaging about 140/100. Had to go to ER once, due to passing out from getting up too quickly.", symptoms: "headache, fatigue, swelling", other_symptoms: "passing out", heart_rate: "100", bp: "140/10", q1: "Do I need to increase my dose of my BP medication?", q2: "How can I prevent passing out again?", status: "completed", condition: c2)
app3 = sandra.appointments.create!(provider: stephanie, date: "2018-11-03", time: "9:00AM", concern: "Feeling down", app_type: "Follow-up", concern_desc: "Been feeling bit down lately, ever since brother passed away. Stopped going to gym and calling in sick more to work. Decreased motivation and no energy at all. Lots of difficulty sleeping.", symptoms: "fatigue", other_symptoms: "low energy", q1: "Is this just grief or am I depressed again?", status: "upcoming", condition: c3)
app4 = sandra.appointments.create!(provider: stephanie, date: "2018-11-01", time: "9:00AM", concern: "Sore throat", app_type: "New concern", concern_desc: "For past three days, been having a lot of pain swallowing. Also have a dry cough and fever. Have not been able to attend school.", symptoms: "cough, fever, headache, pain, fatigue", temp: "38", heart_rate: "120", bp: "90/60", q1: "Do you think I need antibiotics?", status: "upcoming")

app5 = ethel.appointments.create!(provider: stephanie, date: "2018-11-01", time: "10:00AM", concern: "High fever", app_type: "New concern", concern_desc: "Last night I had a high fever, and all my body was shaking.", symptoms: "fever, headache", temp: "40", heart_rate: "120", bp: "90/60", q1: "Do you think I need medication?", status: "upcoming")
app6 = gayle.appointments.create!(provider: stephanie, date: "2018-11-01", time: "11:00AM", concern: "Food intoxication", app_type: "New concern", concern_desc: "I ate some seafood and after that I started with stomach pain, later I got diarrhea and sever discomfort. Drinking Camomille tea helped me.", symptoms: "pain, headache", temp: "36", heart_rate: "120", bp: "90/60", q1: "Could it be an allergy?", status: "upcoming")

Soap.create!(provider: stephanie, appointment: app1, doctor_summary: "Please book an appointment with the diabetic foot nurse. Start proper foot care, including having wife check for ulcers. Start reducing salt intake and moderate exercise.")
Soap.create!(provider: stephanie, appointment: app2, doctor_summary: "Start taking new dose of blood pressure medication. Keep taking BP daily and slowly get up from sitting postion.")
