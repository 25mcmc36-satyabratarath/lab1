$(document).ready(function() {

    let libraryData = [];

    $.ajax({
        url: "library.xml",
        type: "GET",
        dataType: "xml",
        success: function(xml) {

            $(xml).find("book").each(function() {

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publish_date: $(this).find("publish_date").text()
                };

                libraryData.push(book);
            });

            populateFilters();
            displayBooks(libraryData);
        }
    });

    function populateFilters() {

        let genres = [...new Set(libraryData.map(b => b.genre))];
        let authors = [...new Set(libraryData.map(b => b.author))];

        genres.forEach(g => {
            $("#genreSelect").append(`<option value="${g}">${g}</option>`);
        });

        authors.forEach(a => {
            $("#authorSelect").append(`<option value="${a}">${a}</option>`);
        });
    }

    function displayBooks(data) {

        $("#libraryTable tbody").empty();

        $.each(data, function(i, book) {
            $("#libraryTable tbody").append(`
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.price}</td>
                    <td>${book.publish_date}</td>
                </tr>
            `);
        });
    }

    $("#filterBtn").click(function() {

        let selectedGenre = $("#genreSelect").val();
        let selectedAuthor = $("#authorSelect").val();
        let min = parseFloat($("#minPrice").val()) || 0;
        let max = parseFloat($("#maxPrice").val()) || Infinity;

        let filtered = libraryData.filter(book =>
            (selectedGenre === "all" || book.genre === selectedGenre) &&
            (selectedAuthor === "all" || book.author === selectedAuthor) &&
            (book.price >= min && book.price <= max)
        );

        displayBooks(filtered);
    });

});