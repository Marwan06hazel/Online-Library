document.querySelector("form").addEventListener("submit",function(e){
    const title=document.querySelector('[name="title"]').value.trim();
    const author=document.querySelector('[name="author"]').value.trim();
    const category=document.querySelector('[name="category"]').value;
    if(!title||!author||!category){
        e.preventDefault();
        alert("Please fill all required fields!");
        return;
    }
});