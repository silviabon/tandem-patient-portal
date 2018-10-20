# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.destroy_all
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

negroni = Drink.create(
  title: "Sparkling Negroni",
  description: "The perfect cocktail for sipping after an alfresco dinner on a summer night, Negronis get their red hue and herbaceous beginning from the Italian apéritif Campari, which is mellowed out by floral gin and sweet vermouth. Top off your drink with some bubbly, and enjoy.",
  steps: "Combine the first three ingredients in an ice-filled cocktail shaker. Shake until cold, then strain the mixture into a glass. Top with prosecco, and garnish with the orange twist.",
  source: "http://www.architecturaldigest.com/gallery/4-easy-entertaining-summer-cocktail-recipes-5-ingredients-or-less",
)
negroni.ingredients.create(description: "⅓ oz. Campari")
negroni.ingredients.create(description: "⅓ oz. gin")
negroni.ingredients.create(description: "⅓ oz. sweet vermouth")
negroni.ingredients.create(description: "Chilled prosecco, or other sparkling wine, for topping")
negroni.ingredients.create(description: "Orange peel twist (optional)")

margarita = Drink.create(
  title: "Pineapple-Jalapeño Margarita",
  description: "No margarita is complete without fresh-squeezed lime juice—there’s something about the sour punch of citrus that goes so well with the smokiness of tequila. To stir things up, try adding pineapple juice to the mix and muddling in some jalapeño peppers for a little heat.",
  steps: "Pour the lime juice and jalapeños into a shaker and muddle with the back of a wood spoon. Fill with ice. Pour in tequila, pineapple juice, and Grand Marnier. Shake until chilled. Dip the rim of a rocks glass in water, then dip it in coarse salt. Fill the glass with ice, and strain the cocktail into the glass. Garnish with pineapple wedge and peel and jalapeño slices.",
  source: "http://www.architecturaldigest.com/gallery/4-easy-entertaining-summer-cocktail-recipes-5-ingredients-or-less"
)
margarita.ingredients.create(description: "½ oz. fresh lime juice")
margarita.ingredients.create(description: "⅓ of a large jalapeño, sliced, plus more for garnish")
margarita.ingredients.create(description: "1¾ oz. tequila")
margarita.ingredients.create(description: "1½ oz. fresh pineapple juice")
margarita.ingredients.create(description: "½ oz. Grand Marnier or other orange liqueur")
margarita.ingredients.create(description: "Coarse salt, for rimming glass")
margarita.ingredients.create(description: "Pineapple wedge and peel, for garnish")


Provider.destroy_all
Patient.destroy_all
Vital.destroy_all
Immunization.destroy_all
Prescription.destroy_all
Condition.destroy_all
Allergy.destroy_all
Appointment.destroy_all
Soap.destroy_all

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
carl.conditions.create!(name: 'Diabetes')

sarah.allergies.create!(name: 'Ibuprofen', severity: 'Mild')
carl.allergies.create!(name: 'Peanuts', severity: 'Severe')

sarah.appointments.create!(date: '2015-11-12', patient_summary: 'I have a cold', concern: 'cold', status: 'completed')
sarah.appointments.create!(date: '2019-01-03', patient_summary: 'I have a headache', concern: 'headache', status: 'upcoming')

app = carl.appointments.create!(date: '2016-07-03', patient_summary: 'I have a stomach pain', concern: 'stomach pain', status: 'completed')
carl.appointments.create!(date: '2019-03-03', patient_summary: 'I have a stomach pain again', concern: 'stomach pain', status: 'upcoming')

Soap.create!(provider: kevin, appointment: app, doctor_summary: 'He is faking it')
