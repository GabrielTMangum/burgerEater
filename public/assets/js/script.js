console.log('ready')

const newBurger = () => {
    console.log("test")
    let newBurger = {
        burger_name: $(".newBurgerBox").val()
    }
    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(() => {
        console.log("new burger created");
        location.reload();
    });
};

const eat = id => {
    console.log('here')
    console.log($(this).attr("id"))
    let thisid = {'id': id};
    console.log(thisid)
    $.ajax("/api/burgers/", {
        type: "PUT",
        data: thisid
    }).then(() => {
            console.log("updated burger");
            location.assign("/");
        }
    );
}