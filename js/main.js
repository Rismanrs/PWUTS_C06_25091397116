// NAVIGASI AJAX
$(document).on("click", "[data-page]", function(e) {
    e.preventDefault();

    var page = $(this).attr("data-page");
    var id = $(this).attr("data-id") || "";
    var file = page + ".html";

    $("#content").html("<p>Memuat halaman...</p>");

    $.ajax({
        url: file,
        type: "GET",
        success: function(response) {
            var content = $("<div>").html(response);
            content.find("script").remove();
            $("#content").html(content.html());

            $(".menu a").removeClass("active");
            $('.menu a[data-page="' + page + '"]').addClass("active");

            if (page === "promo") {
                $.getScript("js/promo.js");
            }

            if (page === "form-promo") {
                var url = "?page=form-promo";
                if (id) url += "&id=" + encodeURIComponent(id);
                history.replaceState(null, "", url);

                $.getScript("js/form-promo.js", function() {
                    if (typeof isiFormPromo === "function") {
                        isiFormPromo(id);
                    }
                });
            }
        },
        error: function() {
            $("#content").html("<p>Halaman gagal dimuat.</p>");
        }
    });
});

// AMBIL STATISTIK PROMO
function muatStatistikPromo() {
    $.ajax({
        url: "simpan-promo.php",
        type: "GET",
        data: { aksi: "daftar" },
        dataType: "json",
        success: function(data) {
            var total = data.length;
            var aktif = data.filter(function(promo) {
                return promo.aktif == 1;
            }).length;

            $("#totalPromo").text(total);
            $("#promoAktif").text(aktif);
            $("#promoNonaktif").text(total - aktif);
        },
        error: function() {
            $("#totalPromo, #promoAktif, #promoNonaktif").text("-");
        }
    });
}

$(function() {
    muatStatistikPromo();
});
