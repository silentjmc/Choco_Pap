const notAllCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#Tous)');
const allCheckbox = document.getElementById('Tous');
const btnFilter = document.getElementById('btnFilter');

notAllCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        if (allCheckbox.checked == true) {
            allCheckbox.checked = false;
        }
    });
});

allCheckbox.addEventListener("change", () => {
    notAllCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
       }); 
});

btnFilter.addEventListener("click", () => {
    const noteMini = document.getElementById('noteMini').value;
    const noteMax = document.getElementById('noteMax').value;
    renderProducts(products,noteMini, noteMax);
});