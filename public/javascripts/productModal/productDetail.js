// 물품 상세 화면
function productModalOpen(product_code) {
    var modal = document.getElementById('productModal');
    modal.style.display = "block";
    const url = '/productManage/' + product_code;
    fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie('token')
        }
    }).then(response => response.json()).then((data) => {
        document.getElementById("product_name").innerHTML = `물품 이름 : ${data.product_name}`
        document.getElementById("product_category").innerHTML = `대분류 : ${data.product_category.firstCategory} 소분류 : ${data.product_category.secondCategory}`
        document.getElementById("product_code").innerHTML = `물품코드 : ${data.product_code}`
        document.getElementById("rental_availability").innerHTML = `대여 여부 : ${data.rental_availability ? 'O':'X'}`
        document.getElementById("return_needed").innerHTML = `반납 여부 : ${data.return_needed ? 'O':'X'}`
        document.getElementById("quantity").innerHTML = `물품 남은 수량 : ${data.leftQuantity}`
        if(data.rental_availability) {
            document.getElementById("inputStart").innerHTML = `시작일 : <input id="startDate" type="datetime-local" onchange="startEnd()">`
            document.getElementById("inputEnd").innerHTML = `종료일 : <input id="endDate" type="datetime-local" onchange="startEnd()">`
            document.getElementById("inputText").innerHTML = `대여 목적 : <input id="rentPurpose" type="text">`
            document.getElementById('rentalButton').innerHTML= `<button onClick="rental()">대여</button>`
            defaultStartEnd();
        }
        document.getElementById('product_code').value = product_code;
        detail();
    });
}

// 시작일 종료일 기본값
function defaultStartEnd() {
    let startElement = document.getElementById('startDate');
    let endElement = document.getElementById('endDate');
    let date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8);
    startElement.value = date;
    startElement.min = date;
    endElement.min = date;
}

// 시작일 종료일
function startEnd() {
    let start = document.getElementById('startDate');
    let end = document.getElementById('endDate');
    if (start.value)
        end.min = start.value;
    if (end.value)
        start.max = end.value;
    if (start.value > end.value) {
        alert('반납일을 다시 정해주세요.');
        end.value = start.value;
    }
}

// 대여
function rental() {
    let start = document.getElementById('startDate');
    let end = document.getElementById('endDate');
    let text = document.getElementById('rentPurpose');
    let product_code = document.getElementById('product_code').value;
    if(!end.value) return alert('반납일을 정해주세요.');
    const data = {
        product_code: product_code,
        emp_no: localStorage.getItem('emp_no'),
        purpose: text.value,
        start: start.value,
        end: end.value,
    }
    const url = '/rental';
    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie('token')
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then((data) => {
        alert(`대여하셨습니다.`);
        location.reload();
    })
}

// 편집 화면 호출
function edit() {
/*    form.submit();
    const form = document.getElementById('form');*/
}

// 대여명단 모달창 띄우기
function rentalList() {
    document.getElementById('modal-rentalList').style.display = 'block';
    document.getElementById('modal-rental').style.display = 'none';
    const modalContent = document.getElementById('modal-content');
    modalContent.classList.remove('modal-productDetail');
    modalContent.classList.remove('modal-historyList');
    modalContent.classList.add('modal-rentalList');

}

// 대여이력 모달창 띄우기
function history() {
    document.getElementById('modal-rental').style.display = 'none';
    document.getElementById('modal-rentalList').style.display = 'block';
    const modalContent = document.getElementById('modal-content');
    modalContent.classList.remove('modal-productDetail');
    modalContent.classList.remove('modal-rentalList');
    modalContent.classList.add('modal-historyList');
}

// 물품 대여 모달창 띄우기
function detail() {
    document.getElementById('modal-rental').style.display = 'block';
    document.getElementById('modal-rentalList').style.display = 'none';
    const modalContent = document.getElementById('modal-content');
    modalContent.classList.remove('modal-historyList');
    modalContent.classList.remove('modal-rentalList');
    modalContent.classList.add('modal-productDetail');
}

function back() {
    detail();
}