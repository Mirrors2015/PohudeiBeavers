
const formAdminAdd = document.querySelector('#formAdminAdd')




formAdminAdd.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('This work!');

  let title = await formAdminAdd.title.value
  title = title.toLowerCase();

  const weight = formAdminAdd.weight.value
  const kall = formAdminAdd.kall.value
  const proteins = formAdminAdd.proteins.value
  const fats = formAdminAdd.fats.value
  const carbohydrates = formAdminAdd.carbohydrates.value
// console.log(title);
  const res = await fetch('/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      weight,
      kall,
      proteins,
      fats,
      carbohydrates,
    })
  })
  
  console.log(res.status);
  if (res.ok) {
    const response = await res.json();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${response.success}`,
      showConfirmButton: false,
      timer: 1500
    })

    formAdminAdd.title.value = ''
    formAdminAdd.weight.value = ''
    formAdminAdd.kall.value = ''
    formAdminAdd.proteins.value = ''
    formAdminAdd.fats.value = ''
    formAdminAdd.carbohydrates.value = ''
  }else{
    const response = await res.json();

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:  `${response.error}`,
    })
  }
  

  


})
