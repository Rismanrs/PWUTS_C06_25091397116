
function isiFormPromo(id) {
    $("#promoForm")[0].reset();
    $("#promo_id").val("");
    $("#judulForm").text("Buat Promo");
    $("#deskripsiForm").text("Isi informasi promo yang akan dibuat.");
    $("#tombolSimpan").text("Simpan Promo");
    $("#formMessage").text("");

    if (!id) {
        return;
    }

    $.ajax({
        url: "simpan-promo.php",
        type: "GET",
        data: {
            aksi: "detail",
            id: id
        },
        dataType: "json",

        success: function(promo) {
            $("#promo_id").val(promo.id);
            $("#judul").val(promo.judul);
            $("#deskripsi").val(promo.deskripsi);
            $("#diskon").val(promo.diskon);
            $("#produk").val(promo.produk);
            $("#tanggal_mulai").val(promo.tanggal_mulai);
            $("#tanggal_selesai").val(promo.tanggal_selesai);
            $("#aktif").val(promo.aktif);

            $("#judulForm").text("Edit Promo");
            $("#deskripsiForm").text("Ubah informasi promo.");
            $("#tombolSimpan").text("Simpan Perubahan");
        },

        error: function() {
            $("#formMessage")
                .text("Data promo gagal dimuat.")
                .css("color", "red");
        }
    });
}

$(document).off("submit", "#promoForm").on("submit", "#promoForm", function(e) {
    var diskon = Number($("#diskon").val());
    var mulai = $("#tanggal_mulai").val();
    var selesai = $("#tanggal_selesai").val();

    if (diskon < 1 || diskon > 100 || !Number.isInteger(diskon)) {
        e.preventDefault();
        $("#formMessage").text("Diskon harus bilangan bulat antara 1 sampai 100%.").css("color", "red");
        return;
    }

    if (!mulai || !selesai || selesai < mulai) {
        e.preventDefault();
        $("#formMessage").text("Periksa kembali tanggal promo.").css("color", "red");
    }
});
