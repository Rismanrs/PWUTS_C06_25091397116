
function updatePromoSummary(data) {
    var total = data.length;
    var aktif = data.filter(function(promo) {
        return String(promo.aktif) === "1";
    }).length;
    var nonaktif = data.filter(function(promo) {
        return String(promo.aktif) === "0";
    }).length;

    $("#totalPromo").text(total);
    $("#activePromo").text(aktif);
    $("#inactivePromo").text(nonaktif);
}

function tampilkanPromo() {
    $("#promoList").html("<p>Memuat data promo...</p>");
    $("#emptyPromo").hide();

    $.ajax({
        url: "simpan-promo.php",
        type: "GET",
        data: { aksi: "daftar" },
        dataType: "json",

        success: function(data) {
            if (!Array.isArray(data)) {
                $("#promoList").html("<p>Format data promo tidak valid.</p>");
                return;
            }

            // Perbarui ringkasan menggunakan data yang sama.
            updatePromoSummary(data);

            $("#promoList").empty();

            data.forEach(function(promo) {
                var status = String(promo.aktif) === "1" ? "aktif" : "nonaktif";
                var labelStatus = status === "aktif" ? "Aktif" : "Nonaktif";

                var kartu = $("<article>")
                    .addClass("promo-card")
                    .attr("data-status", status);

                var art = $("<div>").addClass("promo-art art-one");
                art.append($("<span>").text("RIFAM SWEETS"));
                art.append($("<strong>").text(promo.diskon + "%"));
                art.append($("<p>").text("OFF"));

                var info = $("<div>").addClass("promo-info");
                info.append(
                    $("<span>")
                        .addClass("status " + status)
                        .text(labelStatus)
                );
                info.append($("<h3>").text(promo.judul));
                info.append($("<p>").text(promo.deskripsi));

                var footer = $("<div>").addClass("promo-footer");
                footer.append(
                    $("<span>").text(
                        promo.tanggal_mulai + " – " + promo.tanggal_selesai
                    )
                );

                var edit = $("<a>")
                    .attr("href", "form-promo.html?id=" + encodeURIComponent(promo.id))
                    .attr("data-page", "form-promo")
                    .attr("data-id", promo.id)
                    .text("Edit");

                footer.append(edit);

                var hapus = $("<button>")
                    .attr("type", "button")
                    .addClass("button-hapus")
                    .attr("data-id", promo.id)
                    .text("Hapus");

                footer.append(hapus);
                info.append(footer);
                kartu.append(art, info);
                $("#promoList").append(kartu);
            });

            filterPromo();
        },

        error: function() {
            $("#promoList").html("<p>Gagal memuat data promo.</p>");
            $("#totalPromo, #activePromo, #inactivePromo").text("—");
            $("#emptyPromo").hide();
        }
    });
}

function filterPromo() {
    var cari = ($("#searchPromo").val() || "").toLowerCase().trim();
    var status = $("#filterStatus").val() || "semua";
    var jumlah = 0;

    $("#promoList .promo-card").each(function() {
        var nama = $(this).find("h3").text().toLowerCase();
        var statusPromo = $(this).attr("data-status");
        var cocok = nama.includes(cari) &&
            (status === "semua" || status === statusPromo);

        $(this).toggle(cocok);

        if (cocok) {
            jumlah++;
        }
    });

    $("#emptyPromo").toggle(jumlah === 0);
}

$(document)
    .off("input", "#searchPromo")
    .on("input", "#searchPromo", filterPromo);

$(document)
    .off("change", "#filterStatus")
    .on("change", "#filterStatus", filterPromo);

$(document)
    .off("click", ".button-hapus")
    .on("click", ".button-hapus", function() {
        var id = $(this).attr("data-id");

        if (!confirm("Yakin ingin menghapus promo ini?")) {
            return;
        }

        $.ajax({
            url: "simpan-promo.php",
            type: "POST",
            data: {
                aksi: "hapus",
                id: id
            },

            success: function() {
                tampilkanPromo();
            },

            error: function() {
                alert("Promo gagal dihapus.");
            }
        });
    });

tampilkanPromo();
