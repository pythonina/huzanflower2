let flag2 = true;
sidebar = $('#sidebar');
const va = sidebar.offset().top;

const win = $('body');
let flag3;

if (win.width() > 768) {
  flag3 = false;
  win.bind('scroll', sc);
} else {
  flag3 = true;
}


win.resize(function (){
  if (win.width() > 768 && flag3) {
    win.bind('scroll', sc);
    flag3 = false;
  } else if(win.width() <= 768 && !flag3) {
    win.unbind('scroll');
    flag3 = true;
  }
})

function sc() {
  if(win.scrollTop() >= va && flag2) {
    flag2 = false;
    sidebar.addClass('pt-66');
  } else if(win.scrollTop() < va && !flag2) {
    sidebar.removeClass('pt-66');
    flag2 = true;
  }
}
