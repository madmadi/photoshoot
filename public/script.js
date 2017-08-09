var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1]

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top + 57;
    if (window_top > div_top) {
        $('#category').addClass('stick');
        $('#sticky-anchor').height($('#category').outerHeight());
    } else {
        $('#category').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
}
var currentImg;
function showImg(img){
    $('html').css('overflowY', 'hidden');
    var path = img.getAttribute("data-src") ? baseUrl + escape(img.getAttribute("data-src")) : img.src
    path = path.replace("photo/lq", 'photo/mq')
    $('#image-view > #canvas > .body > .image').css('background', `rgba(0,0,0,0) url(${path}) no-repeat center center`);
    toggleFill(); toggleFill()
    $('#image-view').show()
    currentImg = img
}
function hideImg(){
    $('html').css('overflowY', 'auto');
    $("#image-view").hide()
}
function nextImg(){
    if(!currentImg) return
    var next_album, next = currentImg.parentNode.nextSibling.nextSibling
    if(next && next.className=='photo') return showImg(next.firstChild);
    next_album = currentImg.parentNode.parentNode.nextSibling.nextSibling
    if(next_album.className=='album' && next_album.children.length > 1) return showImg(next_album.children[1].firstChild)
}
function prevImg(){
    if(!currentImg) return
    var prev_album, prev = currentImg.parentNode.previousSibling.previousSibling
    if(prev && prev.className=='photo') return showImg(prev.firstChild);
    prev_album = currentImg.parentNode.parentNode.previousSibling.previousSibling
    if(prev_album.className=='album' && prev_album.children.length > 1) return showImg(prev_album.lastChild.previousSibling.firstChild)
}

function downloadImg(){
    var path = currentImg.getAttribute("data-src") ? baseUrl + escape(currentImg.getAttribute("data-src")) : currentImg.src
    path = path.replace("photo/lq", 'photo/hq')
    var imgName = path.substring(path.lastIndexOf('/')+1)
    var a = $("<a>")
    .attr("href", path)
    .attr("download", imgName)
    .appendTo("body");
    a[0].click();
    a.remove();
}
var fillFlag
function toggleFill(){
    if(fillFlag) {
        $('#image-view > #canvas > .body > .image').removeClass('coverImage')
        $('#image-view > #canvas > .body > .image').addClass('containImage')
        return fillFlag = false }
    $('#image-view > #canvas > .body > .image').removeClass('containImage')
    $('#image-view > #canvas > .body > .image').addClass('coverImage')
    return fillFlag = true
}
var titleFlag
function toggleTitle(){
    if(fillFlag) {
        $('#image-view > #canvas > .body > .navButton').show()
        $('#image-view > #canvas > .title').show()
        return fillFlag = false }
    $('#image-view > #canvas > .body > .navButton').hide()
    $('#image-view > #canvas > .title').hide()
    return fillFlag = true
}

$(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
    var bLazy = new Blazy();
    $('#category a').click(function(e){
        $('html').css('overflowY', 'auto')
        $('#category').addClass('hidden-xs')
    })
});