const btns = document.querySelectorAll(".btn");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const popComment = document.getElementById("pop-comment");
const forms = document.querySelector(".forms");
const input = document.getElementById("form");
const listComment = document.querySelector(".listing");
const submitBtn = document.querySelector(".submit-btn")
let commentArr = [];
let count = 0;
let decount = 0;
let commentNum = 0;
let isEdit = false;
currentEditId = ''

btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const styles = e.currentTarget.classList;
        if (styles.contains("like")) {
            count++;
            increase.textContent = count;
            increase.style.color = "green";
        } else if (styles.contains("dislike")) {
            decount++;
            decrease.textContent = decount;
            decrease.style.color = "red";
            if (decount && count > 0) {
                count--;
                increase.textContent = count;
            }
        } else {
            forms.classList.add("form-display");
        }
    });
});
// rendering to screen
function renderToScreen() {
    if (commentArr.length) {
        list = "";
        for (let i = 0; i < commentArr.length; i++) {
            list += `<article class="comment-wrap" id=${commentArr[i].id}>
                        <p>${commentArr[i].comment}</p>
                            <div class="btn-container">
                                <button type="button" class="edit-btn">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button type="button" class="delete-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                    </article>`;
        }
        popComment.innerHTML = commentArr.length;
        listComment.innerHTML = list;
        console.log(list);
    }
}
// Adding functionality to the delete icon
listComment.addEventListener("click", (e)=>deleteIcon(e))
function deleteIcon(e){
    if(e.target.classList.contains("fa-trash")){
        let id = e.target.parentElement.parentElement.parentElement.id
        // console.log(id)
        commentArr = commentArr.filter((each)=>(each.id !==id))
        console.log(commentArr)
        e.target.parentElement.parentElement.parentElement.remove()
        if(commentArr.length){
            popComment.innerHTML = commentArr.length;
        }else{
            popComment.innerHTML = 0
        }
    }
    
}
// Adding functionality to the edit icon
document.body.addEventListener("click", (e)=>editIcon(e))
function editIcon(e){
    if(e.target.classList.contains("fa-edit")){
        isEdit = true
        let editing = e.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML;
        currentEditId = e.target.parentElement.parentElement.parentElement.id;
        // console.log(editing)
        input.value = editing
        changeToEdit()
    }
}
// Adding functionality to change the submit btn to edit btn
function changeToEdit(){
    if (isEdit) {
        submitBtn.textContent = "Edit";
    } else {
        submitBtn.textContent = "Post";
    } 
}
// Adding functionality to the form
forms.addEventListener("submit", inputFeatures);
function inputFeatures(e) {
    e.preventDefault();
    const value = input.value;
    if (value.trim() && !isEdit) {
        let newComment = {
            id: new Date().getTime().toString(),
            comment: value,
        };
        commentArr.unshift(newComment);
        input.value = "";
        console.log(commentArr);
        renderToScreen();
    }else if(value.trim() && isEdit) {
        commentArr = commentArr.map((item) => item.id === currentEditId ? {...item, comment: input.value} : item)
        renderToScreen();
        isEdit = false;
        changeToEdit();
        input.value = ''
    }
}
