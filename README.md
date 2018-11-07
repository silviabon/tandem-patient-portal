![Tandem Health Portal Logo](https://github.com/bguids91/tandem-patient-portal/blob/master/docs/Screen%20Shot%202018-11-06%20at%2011.58.43.png?raw=true)

# Tandem Health Portal

The identified problem is that time is not efficiently spent at your family doctor’s appointments. Also, patients are not always allowed access to their medical records. Our solution gives patients more autonomy over their own health and allows doctors more time and preparation for their visits. Instead of a doctor spending a portion of your short visit gathering data, they can have access to this data when the appointment is made. Some patients suffer a general anxiety towards doctor visits and can very easily forget important information for their visit. Our solution gives patients the space to gather their thoughts and ultimately have a more thorough and complete appointment with their GP.  Our hope is to improve patient engagement in matters of their own health. Patients can start keeping a curated copy of their medical record.

## Demo

![Demo](https://github.com/bguids91/tandem-patient-portal/blob/master/docs/ezgif.com-optimize.gif?raw=true)


## Getting started

``` shell
git clone https://github.com/bguids91/patient-portal.git
cd patient-portal
bundle
cd client
npm install
cd ..
cd emr
npm install
cd ..
rake db:migrate
rake db:seed
rake start
```

## Team Members

- Alefiya Vahanvaty https://github.com/alefiyaV
- Ben Guidolin https://github.com/bguids91
- Sebastian Mantilla https://github.com/sebas
- Silvia Bon https://github.com/silviabon
