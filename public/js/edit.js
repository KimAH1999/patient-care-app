const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="patient-name"]').value;
  const dob = document.querySelector('input[name="patient-dob"]').value;
  const sex = document.querySelector('input[name="patient-sex"]').value;
  const gender = document.querySelector('input[name="patient-gender"]').value;
  const height = document.querySelector('input[name="patient-height"]').value;
  const weight = document.querySelector('input[name="patient-weight"]').value;
  const treatment_plan = document.querySelector('textarea[name="patient-treatment-plan"]').value;

  await fetch(`/api/patient/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      dob,
      sex,
      gender,
      height,
      weight,
      treatment_plan,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function() {
  await fetch(`/api/patient/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
