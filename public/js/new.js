const newFormHandler = async function(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="patient-name"]').value;
  const dob = document.querySelector('input[name="patient-dob"]').value;
  const sex = document.querySelector('input[name="patient-sex"]').value;
  const gender = document.querySelector('input[name="patient-gender"]').value;
  const height = document.querySelector('input[name="patient-height"]').value;
  const weight = document.querySelector('input[name="patient-weight"]').value;
  const treatment_plan = document.querySelector('textarea[name="patient-treatment-plan"]').value;

  await fetch(`/api/patient`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      dob,
      sex,
      gender,
      height,
      weight,
      treatment_plan,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
