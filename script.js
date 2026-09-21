// ==========================================
// DATA
// ==========================================

let kategori = JSON.parse(localStorage.getItem("kategori")) || [
    "Makanan",
    "Minuman"
];

let produk = JSON.parse(localStorage.getItem("produk")) || [
    {
        kode: "P001",
        nama: "Nasi Goreng",
        kategori: "Makanan",
        harga: 15000,
        stok: 10
    },
    {
        kode: "P002",
        nama: "Mie Goreng",
        kategori: "Makanan",
        harga: 12000,
        stok: 10
    },
    {
        kode: "P003",
        nama: "Ayam Geprek",
        kategori: "Makanan",
        harga: 18000,
        stok: 10
    },
    {
        kode: "P004",
        nama: "Es Teh",
        kategori: "Minuman",
        harga: 5000,
        stok: 15
    },
    {
        kode: "P005",
        nama: "Es Jeruk",
        kategori: "Minuman",
        harga: 7000,
        stok: 15
    }
];

let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

let keranjang = [];


// ==========================================
// LOGIN
// ==========================================

let users = [
    {
        username: "admin",
        password: "12345"
    },
    {
        username: "Abel",
        password: "Abel"
    },
    {
        username: "Denis",
        password: "Denis"
    },
    {
        username: "Farhan",
        password: "Farhan"
    }
       
];

function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (
        (username === "admin" && password === "12345") ||
        (username === "Abel" && password === "Abel") ||
        (username === "Denis" && password === "Denis") ||
        (username === "Farhan" && password === "Farhan")
    ) {

        alert("Login berhasil!");

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";

        tampilkanSemua();

    } else {

        document.getElementById("loginError").innerText =
            "Username atau password salah!";
    }
}


// ==========================================
// NAVIGASI
// ==========================================

function showPage(namaPage) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    document.getElementById(namaPage).style.display = "block";

    tampilkanSemua();
}


// ==========================================
// SIMPAN DATA
// ==========================================

function simpanData() {

    localStorage.setItem(
        "kategori",
        JSON.stringify(kategori)
    );

    localStorage.setItem(
        "produk",
        JSON.stringify(produk)
    );

    localStorage.setItem(
        "transaksi",
        JSON.stringify(transaksi)
    );
}


// ==========================================
// KATEGORI - CREATE
// ==========================================

function tambahKategori() {

    let nama = document.getElementById("namaKategori").value.trim();

    if (nama === "") {
        alert("Nama kategori harus diisi!");
        return;
    }

    if (kategori.includes(nama)) {
        alert("Kategori sudah ada!");
        return;
    }

    kategori.push(nama);

    document.getElementById("namaKategori").value = "";

    simpanData();
    tampilkanKategori();
    isiSelectKategori();

    alert("Kategori berhasil ditambahkan!");
}


// ==========================================
// KATEGORI - READ
// ==========================================

function tampilkanKategori() {

    let tabel = document.getElementById("tabelKategori");

    tabel.innerHTML = "";

    kategori.forEach(function(nama, index) {

        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${nama}</td>
                <td>
                    <button onclick="editKategori(${index})">
                        Edit
                    </button>

                    <button onclick="hapusKategori(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalKategori").innerText =
        kategori.length;
}


// ==========================================
// KATEGORI - UPDATE
// ==========================================

function editKategori(index) {

    let namaBaru = prompt(
        "Masukkan nama kategori baru:",
        kategori[index]
    );

    if (namaBaru === null || namaBaru.trim() === "") {
        return;
    }

    kategori[index] = namaBaru.trim();

    simpanData();
    tampilkanKategori();
    isiSelectKategori();

    alert("Kategori berhasil diubah!");
}


// ==========================================
// KATEGORI - DELETE
// ==========================================

function hapusKategori(index) {

    let nama = kategori[index];

    let digunakan = produk.some(function(item) {
        return item.kategori === nama;
    });

    if (digunakan) {
        alert(
            "Kategori tidak bisa dihapus karena masih digunakan produk!"
        );
        return;
    }

    if (confirm("Hapus kategori ini?")) {

        kategori.splice(index, 1);

        simpanData();
        tampilkanKategori();
        isiSelectKategori();
    }
}


// ==========================================
// SELECT KATEGORI
// ==========================================

function isiSelectKategori() {

    let select = document.getElementById("kategoriProduk");

    select.innerHTML = "";

    kategori.forEach(function(nama) {

        select.innerHTML += `
            <option value="${nama}">
                ${nama}
            </option>
        `;
    });
}


// ==========================================
// PRODUK - CREATE
// ==========================================

function tambahProduk() {

    let kode = document.getElementById("kodeProduk").value.trim();
    let nama = document.getElementById("namaProduk").value.trim();
    let kat = document.getElementById("kategoriProduk").value;
    let harga = Number(document.getElementById("hargaProduk").value);
    let stok = Number(document.getElementById("stokProduk").value);

    if (
        kode === "" ||
        nama === "" ||
        harga <= 0 ||
        stok < 0
    ) {
        alert("Data produk belum lengkap atau tidak valid!");
        return;
    }

    let kodeAda = produk.some(function(item) {
        return item.kode === kode;
    });

    if (kodeAda) {
        alert("Kode produk sudah digunakan!");
        return;
    }

    produk.push({
        kode: kode,
        nama: nama,
        kategori: kat,
        harga: harga,
        stok: stok
    });

    document.getElementById("kodeProduk").value = "";
    document.getElementById("namaProduk").value = "";
    document.getElementById("hargaProduk").value = "";
    document.getElementById("stokProduk").value = "";

    simpanData();
    tampilkanProduk();

    alert("Produk berhasil ditambahkan!");
}


// ==========================================
// PRODUK - READ + SEARCH
// ==========================================

function tampilkanProduk() {

    let tabel = document.getElementById("tabelProduk");

    let keyword = document
        .getElementById("cariProduk")
        .value
        .toLowerCase();

    tabel.innerHTML = "";

    produk.forEach(function(item, index) {

        let cocok =
            item.kode.toLowerCase().includes(keyword) ||
            item.nama.toLowerCase().includes(keyword) ||
            item.kategori.toLowerCase().includes(keyword);

        if (cocok) {

            tabel.innerHTML += `
                <tr>
                    <td>${item.kode}</td>
                    <td>${item.nama}</td>
                    <td>${item.kategori}</td>
                    <td>${formatRupiah(item.harga)}</td>
                    <td>${item.stok}</td>
                    <td>
                        <button onclick="editProduk(${index})">
                            Edit
                        </button>

                        <button onclick="hapusProduk(${index})">
                            Hapus
                        </button>
                    </td>
                </tr>
            `;
        }
    });

    document.getElementById("totalProduk").innerText =
        produk.length;
}


// ==========================================
// PRODUK - UPDATE
// ==========================================

function editProduk(index) {

    let item = produk[index];

    let nama = prompt(
        "Nama produk:",
        item.nama
    );

    if (nama === null || nama.trim() === "") {
        return;
    }

    let harga = Number(
        prompt("Harga:", item.harga)
    );

    let stok = Number(
        prompt("Stok:", item.stok)
    );

    if (harga <= 0 || stok < 0) {
        alert("Harga atau stok tidak valid!");
        return;
    }

    item.nama = nama;
    item.harga = harga;
    item.stok = stok;

    simpanData();
    tampilkanProduk();

    alert("Produk berhasil diubah!");
}


// ==========================================
// PRODUK - DELETE
// ==========================================

function hapusProduk(index) {

    if (confirm("Hapus produk ini?")) {

        produk.splice(index, 1);

        simpanData();
        tampilkanProduk();

        alert("Produk berhasil dihapus!");
    }
}


// ==========================================
// TRANSAKSI - TAMPIL PRODUK
// ==========================================

function tampilkanTransaksiProduk() {

    let tabel =
        document.getElementById("tabelTransaksiProduk");

    tabel.innerHTML = "";

    produk.forEach(function(item, index) {

        tabel.innerHTML += `
            <tr>
                <td>${item.kode}</td>
                <td>${item.nama}</td>
                <td>${formatRupiah(item.harga)}</td>
                <td>${item.stok}</td>

                <td>
                    <button
                        onclick="tambahKeranjang(${index})"
                        ${item.stok === 0 ? "disabled" : ""}
                    >
                        Tambah
                    </button>
                </td>
            </tr>
        `;
    });
}


// ==========================================
// KERANJANG - TAMBAH
// ==========================================

function tambahKeranjang(index) {

    let item = produk[index];

    let ada = keranjang.find(function(x) {
        return x.kode === item.kode;
    });

    if (ada) {

        if (ada.qty >= item.stok) {

            alert("Jumlah melebihi stok!");
            return;
        }

        ada.qty++;

    } else {

        keranjang.push({
            kode: item.kode,
            nama: item.nama,
            harga: item.harga,
            qty: 1
        });
    }

    tampilkanKeranjang();
}


// ==========================================
// KERANJANG - TAMPIL
// ==========================================

function tampilkanKeranjang() {

    let tabel =
        document.getElementById("tabelKeranjang");

    tabel.innerHTML = "";

    let total = 0;

    keranjang.forEach(function(item, index) {

        let subtotal = item.harga * item.qty;

        total += subtotal;

        tabel.innerHTML += `
            <tr>
                <td>${item.nama}</td>

                <td>
                    ${formatRupiah(item.harga)}
                </td>

                <td>
                    <button onclick="kurangQty(${index})">
                        -
                    </button>

                    ${item.qty}

                    <button onclick="tambahQty(${index})">
                        +
                    </button>
                </td>

                <td>
                    ${formatRupiah(subtotal)}
                </td>

                <td>
                    <button onclick="hapusKeranjang(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalKeranjang").innerText =
        formatRupiah(total);
}


// ==========================================
// QUANTITY - TAMBAH
// ==========================================

function tambahQty(index) {

    let item = keranjang[index];

    let produkAsli = produk.find(function(x) {
        return x.kode === item.kode;
    });

    if (item.qty >= produkAsli.stok) {

        alert("Quantity tidak boleh melebihi stok!");
        return;
    }

    item.qty++;

    tampilkanKeranjang();
}


// ==========================================
// QUANTITY - KURANG
// ==========================================

function kurangQty(index) {

    if (keranjang[index].qty <= 1) {

        alert("Quantity minimal adalah 1!");
        return;
    }

    keranjang[index].qty--;

    tampilkanKeranjang();
}


// ==========================================
// HAPUS KERANJANG
// ==========================================

function hapusKeranjang(index) {

    keranjang.splice(index, 1);

    tampilkanKeranjang();
}


// ==========================================
// SIMPAN TRANSAKSI
// ==========================================

function simpanTransaksi() {

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong!");
        return;
    }

    let total = 0;

    keranjang.forEach(function(item) {

        let produkAsli = produk.find(function(x) {
            return x.kode === item.kode;
        });

        // Validasi stok
        if (item.qty > produkAsli.stok) {

            alert(
                "Stok " +
                produkAsli.nama +
                " tidak mencukupi!"
            );

            return;
        }

        total += item.harga * item.qty;
    });


    let nomor =
        "TRX" +
        Date.now();

    let tanggal = new Date();

    let dataTransaksi = {

        nomor: nomor,

        tanggal:
            tanggal.toISOString(),

        items: JSON.parse(
            JSON.stringify(keranjang)
        ),

        total: total
    };


    // Kurangi stok
    keranjang.forEach(function(item) {

        let produkAsli = produk.find(function(x) {
            return x.kode === item.kode;
        });

        produkAsli.stok -= item.qty;
    });


    transaksi.push(dataTransaksi);

    keranjang = [];

    simpanData();

    tampilkanSemua();

    alert(
        "Transaksi berhasil disimpan!\n\n" +
        "Nomor: " + nomor +
        "\nTotal: " + formatRupiah(total)
    );
}


// ==========================================
// RIWAYAT TRANSAKSI
// ==========================================

function tampilkanRiwayat() {

    let tabel =
        document.getElementById("tabelRiwayat");

    let keyword =
        document.getElementById("cariTransaksi").value
        .toLowerCase();

    let tanggal =
        document.getElementById("tanggalTransaksi").value;

    tabel.innerHTML = "";

    transaksi.forEach(function(item) {

        let tanggalItem =
            item.tanggal.substring(0, 10);

        let cocokNomor =
            item.nomor
            .toLowerCase()
            .includes(keyword);

        let cocokTanggal =
            tanggal === "" ||
            tanggal === tanggalItem;

        if (cocokNomor && cocokTanggal) {

            tabel.innerHTML += `
                <tr>
                    <td>${item.nomor}</td>

                    <td>
                        ${formatTanggal(item.tanggal)}
                    </td>

                    <td>
                        ${formatRupiah(item.total)}
                    </td>
                </tr>
            `;
        }
    });
}


// ==========================================
// LAPORAN
// ==========================================

function tampilkanLaporan() {

    let tabel =
        document.getElementById("tabelLaporan");

    tabel.innerHTML = "";

    let sekarang = new Date();

    let hariIni =
        sekarang.toISOString().substring(0, 10);

    let bulanIni =
        sekarang.toISOString().substring(0, 7);

    let totalHari = 0;
    let totalBulan = 0;


    transaksi.forEach(function(item) {

        let tanggal =
            item.tanggal.substring(0, 10);

        let bulan =
            item.tanggal.substring(0, 7);

        if (tanggal === hariIni) {

            totalHari += item.total;
        }

        if (bulan === bulanIni) {

            totalBulan += item.total;
        }


        item.items.forEach(function(produkItem) {

            tabel.innerHTML += `
                <tr>
                    <td>${item.nomor}</td>

                    <td>
                        ${formatTanggal(item.tanggal)}
                    </td>

                    <td>
                        ${produkItem.nama}
                    </td>

                    <td>
                        ${produkItem.qty}
                    </td>

                    <td>
                        ${formatRupiah(
                            produkItem.harga *
                            produkItem.qty
                        )}
                    </td>
                </tr>
            `;
        });
    });


    document.getElementById("laporanHari").innerText =
        formatRupiah(totalHari);

    document.getElementById("laporanBulan").innerText =
        formatRupiah(totalBulan);
}


// ==========================================
// DASHBOARD
// ==========================================

function tampilkanDashboard() {

    document.getElementById("totalProduk").innerText =
        produk.length;

    document.getElementById("totalKategori").innerText =
        kategori.length;

    document.getElementById("totalTransaksi").innerText =
        transaksi.length;

    let total = 0;

    transaksi.forEach(function(item) {

        total += item.total;
    });

    document.getElementById("totalPendapatan").innerText =
        formatRupiah(total);
}


// ==========================================
// FORMAT RUPIAH
// ==========================================

function formatRupiah(angka) {

    return "Rp" +
        angka.toLocaleString("id-ID");
}


// ==========================================
// FORMAT TANGGAL
// ==========================================

function formatTanggal(tanggal) {

    let date = new Date(tanggal);

    return date.toLocaleString("id-ID");
}


// ==========================================
// TAMPILKAN SEMUA DATA
// ==========================================

function tampilkanSemua() {

    tampilkanDashboard();

    tampilkanKategori();

    isiSelectKategori();

    tampilkanProduk();

    tampilkanTransaksiProduk();

    tampilkanKeranjang();

    tampilkanRiwayat();

    tampilkanLaporan();
}
