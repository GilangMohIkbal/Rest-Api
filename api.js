const API_BUKU = "https://mybook-order.herokuapp.com/books";
const API_KATEGORI = "https://mybook-order.herokuapp.com/books/type"

const getAllKategori = async () => {
    try {
        const request = await axios.get(API_KATEGORI);
        const data = request.data.data
        let listHtml = ""
        data.forEach(kategori => {
            listHtml += `<option value="${kategori.id}">${kategori.name}</option>`
        });
        $("#kategori").html(listHtml)
    } catch (error) {
        console.log(error)
    }
}
const getAllBuku = async () => {
    try {
        const request = await axios.get(API_BUKU);
        const data = request.data.data;
        let listHtml = "";
        data.forEach((book, i) => {
            listHtml += `
                            <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${book.name}</td>
                            <td>${book.type_book.name}</td>
                            <td> <button type="button" class="btn btn-danger" onclick="deleteBuku(${book.id})">Hapus</button> </td>
                        </tr>`
        });
        $("#list-buku").html(listHtml);
    } catch (error) {
        console.log(error);
    }
}
const createBuku = async () => {
    try {
        const payload = {
            name: $("#name").val(),
            type_books_id: $("#kategori").val()
        }
        const request = await axios.post(API_BUKU, payload);
        $("#modalTambah").modal("hide");
        $("#name").val("");
        $("#kategori").val("");
        Swal.fire({
            icon: 'success',
            title: 'Success!!!',
            text: request.data.message,
        })
        getAllBuku();
    } catch (error) {
        console.log(error);
    }
}

const deleteBuku = async (id) => {
    try {
        const request = await axios.delete(API_BUKU, {
            data: {
                id: id
            }
        });
        Swal.fire({
            icon: 'success',
            title: 'Success!!!',
            text: request.data.message,
        })
        getAllBuku();
    } catch (error) {
        console.log(error);
    }
}
getAllBuku();
getAllKategori();