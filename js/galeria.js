function nextElement(){
    let lists = document.querySelectorAll('.itemG');
    document.getElementById('slide').appendChild(lists[0]);
}
function prevElement(){
    let lists = document.querySelectorAll('.itemG');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}