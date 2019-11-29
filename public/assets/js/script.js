window.onload = () => {
    console.log('test')

    $(".eatBtn").on("click", function (event) {
        console.log("hello")
        event.preventDefault();

       // let updatedBurger = true; <====== not needed we can assume if the is function is fired that it will be consumed
        
        let id = {id: $(this).attr("id")};
        console.log(id)
        $.ajax("/api/burgers/", {
            type: "PUT",
            data: id
        }).then(
            function () {
                console.log("updated quote");
                location.assign("/");
            }
        );
    });
};