function changeView(){

    var signUpBox = document.getElementById("signUpBox");
    var signInBox = document.getElementById("signInBox");

    signUpBox.classList.toggle("d-none");
    signInBox.classList.toggle("d-none");

}

function signUp(){
    
    var f = document.getElementById("f");
    var l = document.getElementById("l");
    var e = document.getElementById("e");
    var p = document.getElementById("p");
    var m = document.getElementById("m");
    var g = document.getElementById("g");

    var form = new FormData;
    form.append("f", f.value);
    form.append("l", l.value);
    form.append("e", e.value);
    form.append("p", p.value);
    form.append("m", m.value);
    form.append("g", g.value);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            var text = request.responseText;
            if(text == "success"){
                document.getElementById("msg").innerHTML = text;
                document.getElementById("msg").className = "bi bi-check2-circle fs-5";
                document.getElementById("alertdiv").className = "alert alert-success";
                document.getElementById("msgdiv").className = "d-block";
            }else{
            document.getElementById("msg").innerHTML = text;
            document.getElementById("msgdiv").className = "d-block";
            }
        }
    }
    request.open("POST", "signUpProcess.php", true);
    request.send(form);

}

function signIn(){

    var email = document.getElementById("email2");
    var password = document.getElementById("password2");
    var rememberme = document.getElementById("rememberme");

    var f = new FormData();
    f.append("e",email.value);
    f.append("p",password.value);
    f.append("r",rememberme.checked);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;
            if(t == "success"){
                window.location = "home.php";
            }else{
                document.getElementById("msg2").innerHTML = t;
            }
            
        }
    };

    r.open("POST","signInProcess.php",true);
    r.send(f);
    
}

var bm;
function forgotPassword(){

    var email = document.getElementById("email2");

    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;
            if(t == "Success"){
                alert("Verification code has sent to your email. Please check your inbox");
                var m = document.getElementById("forgotPasswordModal");
                bm = new bootstrap.Modal(m);
                bm.show();
            }else{
                alert(t);
            }
        }
    }

    r.open("GET","forgotPasswordProcess.php?e=" + email.value,true);
    r.send();


}

function ShowPassword(){


    var input = document.getElementById("npi");
    var btn = document.getElementById("npb");
    var eye = document.getElementById("e1");


    if(input.type  == "password"){
        input.type = "text";
        eye.className = "bi bi-eye-fill";
    }else{
        input.type = "password";
        eye.className = "bi bi-eye-slash-fill";
    }
}

function ShowPassword2(){

    var input = document.getElementById("rnp");
    var btn = document.getElementById("rnpb");
    var eye = document.getElementById("e1");

    if(input.type  == "password"){
        input.type = "text";
        eye.className = "bi bi-eye-fill";
    }else{
        input.type = "password";
        eye.className = "bi bi-eye-slash-fill";
    }

}

function resetpw(){

    var email = document.getElementById("email2");
    var np = document.getElementById("npi");
    var rnp = document.getElementById("rnp");
    var vcode = document.getElementById("vc");

    var f = new FormData();
    f.append("e",email.value);
    f.append("n",np.value);
    f.append("r",rnp.value);
    f.append("v",vcode.value);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function(){
        if(r.readyState == 4){
            var t = r.responseText;
            if(t=="success"){

                bm.hide();
                alert("Success");

            }else{

            alert(t);

            }
        }
    };

    r.open("POST","resetPassword.php",true);
    r.send(f);

}

function signout(){
    
    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;
            if(t == "Success"){
                // window.location = "home.php";

                window.location.reload();
            }else{
                alert (t);
            }
        }
    };

    r.open("GET","signoutProcess.php",true);
    r.send();

}

function changeImage(){
    var view = document.getElementById("viewImg");//img tag
    var file = document.getElementById("profileimg");//file chooser

    file.onchange = function (){
        var file1 = this.files[0];
        var url = window.URL.createObjectURL(file1);
        view.src = url;
    }
}

function updateProfile(){
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var mobile = document.getElementById("mobile");
    var line1 = document.getElementById("line1");
    var line2 = document.getElementById("line2");
    var province = document.getElementById("province");
    var district = document.getElementById("district");
    var city = document.getElementById("city");
    var pcode = document.getElementById("pcode");
    var image = document.getElementById("profileimg");

    var f = new FormData();

    f.append("fn",fname.value);
    f.append("ln",lname.value);
    f.append("m",mobile.value);
    f.append("l1",line1.value);
    f.append("l2",line2.value);
    f.append("p",province.value);
    f.append("d",district.value);
    f.append("c",city.value);
    f.append("pc",pcode.value);

    if(image.files.length == 0){

        var confirmation = confirm("Are you sure You don't want to update the Profile Image?");

        if(confirmation){
            alert ("you have not selected and image.");
        }

    }else{
        f.append("image",image.files[0]);
    }

    var r = new XMLHttpRequest();

    r.onreadystatechange = function(){
        if(r.readyState == 4){
            var t = r.responseText;
            alert (t);
        }
    }

    r.open("POST","updateProfileProcess.php",true);
    r.send(f);
}

function changeProductImage() {
    var image = document.getElementById("imageuploader");

    image.onchange = function () {

        var file_count = image.files.length;

        if (file_count <=3) {
            
            for (var x = 0; x < file_count; x++) {
                var file = this.files[x];
                var url = window.URL.createObjectURL(file);

                documnet.getElementById("i"+ x).src = url;
            }
        } else {
            alert("Please select 3 or less than 3 images.");
        }
    }
}

function addProduct() {
    var category = document.getElementById("category");
    var brand = document.getElementById("brand");
    var model = document.getElementById("model");
    var title = document.getElementById("title");

    var condition = 0;
    if (document.getElementById("b").checked) {
        condition = 1;
    } else if (document.getElementById("u").checked) {
        condition = 2;
    }

    var colour = document.getElementById("clr");
    var colour_input = document.getElementById("clr_in");
    var qty = document.getElementById("qty");
    var cost = document.getElementById("cost");
    var dwc = document.getElementById("dwc");
    var doc = document.getElementById("doc");
    var desc = document.getElementById("desc");
    var image = document.getElementById("imageuploader");

    var f = new FormData();

    f.append("ca", category.value);
    f.append("b", brand.value);
    f.append("m", model.value);
    f.append("t", title.value);
    f.append("con", condition);
    f.append("col", colour.value);
    f.append("col_in", colour_input.value);
    f.append("qty", qty.value);
    f.append("cost", cost.value);
    f.append("dwc", dwc.value);
    f.append("doc", doc.value);
    f.append("desc", desc.value);

    var file_count = image.files.length;

    for (var x = 0; x < file_count; x++) {
        f.append("image" + x, image.files[x]);
    }

    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            var t = r.responseText;
            if (t == "Product image saved successfully") {
                window.location.reload();
            } else {
                alert(t);
            }
        }
    }

    r.open("POST", "addProductProcess.php", true);
    r.send(f);
}

function load_brand() {

    var category = document.getElementById("category").value;

    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            var t = r.responseText;

            document.getElementById("brand").innerHTML = t;

        }
    }

    r.open("GET", "loadBrand.php?c=" + category, true);
    r.send();

}

function changeStatus(id) {

    var product_id = id;

    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;

            if(t == "deactivated"){

                alert ("Product Deactivated");
                window.location.reload();

            }else if(t == "activated"){

                alert ("Product Activated");
                window.location.reload();

            }else{
                alert (t);
            }
            
        }
    }

    r.open("GET", "changeStatusProcess.php?p=" + product_id, true);
    r.send();

}

function sort1(x){

    var search = document.getElementById("s");
    var time = "0";

    if(document.getElementById("n").checked){
        time = "1";
    }else if(document.getElementById("o").checked){
        time = "2";
    }

    var qty = "0";

    if(document.getElementById("h").checked){
        qty = "1";
    }else if(document.getElementById("l").checked){
        qty = "2";
    }

    var condition = "0";

    if(document.getElementById("b").checked){
        condition = "1";
    }else if(document.getElementById("u").checked){
        condition = "2";
    }

    var f = new FormData();
    f.append("s",search.value);
    f.append("t",time);
    f.append("q",qty);
    f.append("c",condition);
    f.append("page",x);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;

            document.getElementById("sort").innerHTML = t;
            
        }
    }

    r.open("POST","sortProcess.php",true);
    r.send(f);
    
}

function clearSort(){
    window.location.reload();
}

function sendId(id){

    var r = new XMLHttpRequest();

    r.onreadystatechange = function(){
        if(r.readyState == 4){
            var t = r.responseText;
            if(t == "success"){
                window.location = "updateProduct.php";
            }else{
                alert (t);
            }
        }
    }

    r.open("GET","sendProductIdProcess.php?id=" + id,true);
    r.send();
    
}

function updateProduct(){
    
    var title = document.getElementById("t");
    var qty = document.getElementById("q");
    var delivery_within_colombo = document.getElementById("dwc");
    var delivery_outof_colombo = document.getElementById("doc");
    var description = document.getElementById("d");
    var images = document.getElementById("imageuploader");

    var f = new FormData();
    f.append("t",title.value);
    f.append("q",qty.value);
    f.append("dwc",delivery_within_colombo.value);
    f.append("doc",delivery_outof_colombo.value);
    f.append("d",description.value);

    var img_count = images.files.length;

    for(var x = 0;x < img_count;x++){
        f.append("i" + x,images.files[x]);
    }

    var r = new XMLHttpRequest();

    r.onreadystatechange = function(){
        if(r.readyState == 4){
            var t = r.responseText;
            alert(t);
        }
    }

    r.open("POST","updateProcess.php",true);
    r.send(f);
    
}

function basicSearch(x){

    var txt = document.getElementById("basic_search_txt");
    var select = document.getElementById("basic_search_select");

    var f = new FormData();
    f.append("t",txt.value);
    f.append("s",select.value);
    f.append("page",x);

    var r = new XMLHttpRequest();
    
    r.onreadystatechange = function(){
        if(r.readyState == 4){
            var t = r.responseText;
            document.getElementById("basicSearchResult").innerHTML = t;
        }
    }

    r.open("POST","basicSearchProcess.php",true);
    r.send(f);

}

function advancedSearch(x){
    var txt = document.getElementById("t");
    var category = document.getElementById("c1");
    var brand = document.getElementById("b");
    var model = document.getElementById("m");
    var condition = document.getElementById("c2");
    var color = document.getElementById("c3");
    var from = document.getElementById("pf");
    var to = document.getElementById("pt");
    var sort = document.getElementById("s");

    var f = new FormData();
    f.append("t",txt.value);
    f.append("cat",category.value);
    f.append("b",brand.value);
    f.append("m",model.value);
    f.append("con",condition.value);
    f.append("col",color.value);
    f.append("pf",from.value);
    f.append("to",to.value);
    f.append("s",sort.value);
    f.append("page",x);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;
            document.getElementById("view_area").innerHTML = t;
        }
    }

    r.open("POST","advancedSearchProcess.php",true);
    r.send(f);
}

function loadMainImg(id) { 
    var img = document.getElementById("productImg" + id).src;
    var main = document.getElementById("main_img");
    main.style.backgroundImage = "url("+img+")";
 }

 function checkValue(qty){
    var input = document.getElementById("qty_input");

    if(input.value <= 0){
        alert ("Quantity must be 1 or more");
        input.value = 1;
    }else if(input.value > qty){
        alert ("Maximum quantity achieved");
        input.value = qty;
    }
 }

 function qty_inc(qty){
    var input = document.getElementById("qty_input");
    if(input.value < qty){
        var newValue = parseInt(input.value) + 1;
        input.value = newValue.toString();
    }else{
        alert ("Maximum quantity has achieved");
        input.value = qty;
    }
 }

 function qty_dec(){
    var input = document.getElementById("qty_input");
    if(input.value > 1){
        var newValue = parseInt(input.value) - 1;
        input.value = newValue.toString();
    }else{
        alert ("Minimum quantity has achieved");
        input.value = 1;
    }
 }

 function addToWatchlist(id){
    var r = new XMLHttpRequest();

    r.onreadystatechange = function () { 
        if(r.readyState == 4){
            var t = r.responseText;
            if(t == "removed"){
                document.getElementById("heart"+id).style.className = "text-dark";
                window.location.reload();
            }else if(t == "added"){
                document.getElementById("heart"+id).style.className = "text-danger";
                window.location.reload();
            }else{
                alert (t);
            }
        }
     }
    
    r.open("GET","addToWatchlistProcess.php?id="+id,true);
    r.send();
 }

 function removeFromWatchlist(id){
    
    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;
            if(t == "success"){
                window.location.reload();
            }else{
                alert (t);
            }
        }
    }

    r.open("GET","removeWatchlistProcess.php?id="+id,true);
    r.send();

 }

 function addToCart(id){

    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;
            alert(t);
        }
    }

    r.open("GET","addToCartProcess.php?id="+id,true);
    r.send();

 }

function deleteFromCart(id){

    var r = new XMLHttpRequest();

    r.onreadystatechange = function (){
        if(r.readyState == 4){
            var t = r.responseText;
            if(t == "Success"){
                alert ("Product removed from cart");
                window.location.reload();
            }else{
            alert(t);
            }
        }
    }

    r.open("GET","deleteFromCartProcess.php?id="+id,true);
    r.send();

}
