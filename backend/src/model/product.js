const connect= require('../config/database');

function Product(newProduct){
    this.name = newProduct.name ;
    this.price = newProduct.price ;
    this.number = newProduct.number ;
    this.mota = newProduct.mota ;
    this.img = newProduct.img ;
    this.id_danhmuc = newProduct.id_danhmuc ;
    this.id_company = newProduct.id_company;
}

Product.getProducts = async function(id , limit){
    try {
        const query = "SELECT sanpham.*, danhmuc.tendanhmuc, company.namecompany FROM sanpham INNER JOIN danhmuc ON sanpham.id_danhmuc = danhmuc.id INNER JOIN company ON sanpham.id_company = company.id_company WHERE danhmuc.id = ? ORDER BY sanpham.id_sanpham DESC LIMIT ?, 12";
        const [result] = await connect.query(query , [id, limit]);
        return result;
    } catch (error) {
        throw error;
    }
}
Product.getAllProducts = async function(){
    try {
        const query =
          "SELECT sanpham.*, company.namecompany FROM sanpham INNER JOIN company ON sanpham.id_company = company.id_company"; ;
        const [result] = await connect.query(query);
        return result;
    } catch (error) {
        throw error;
    }
}

Product.getCount = async function(newProduct) {
    try {
        const query = "SELECT COUNT(id_danhmuc) as totalCount FROM sanpham WHERE id_danhmuc = ?;";
        const [result] = await connect.query(query , [newProduct.id_danhmuc]);
        return result[0]['totalCount'];
    } catch (error) {
        throw error;
    }
}

Product.inserProducts = async function(newProduct){
    try {
        const query = "INSERT INTO `sanpham` (`ten`, `gia`, `so_luong`, `mo_ta`, `img` , `id_danhmuc` , `id_company`) VALUES (?,?,?,?,?,?,?);"
        const result = await connect.execute(query, [newProduct.name , newProduct.price , newProduct.number , newProduct.mota , newProduct.img , newProduct.id_danhmuc , newProduct.id_company]);
        return result;
    } catch (error) {
        throw error;
    }
}

Product.getByID = async function (id) {
    try {
        const query =
          "SELECT sanpham.*, danhmuc.tendanhmuc, company.namecompany FROM sanpham INNER JOIN danhmuc ON sanpham.id_danhmuc = danhmuc.id INNER JOIN company ON sanpham.id_company = company.id_company WHERE id_sanpham = ?";
        const [result] =  await connect.execute(query , [id]);
        return result;
    } catch (error) {
        throw error;
    }
}
Product.deleteID = async function (id) {
    try {
        const query = "DELETE FROM sanpham where id_sanpham = ? ";
        const [result] =  await connect.execute(query , [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

Product.updateProduct = async function (newProduct , id , newImg) {
    try {
        const query = "UPDATE sanpham SET ten = ?, gia = ?, so_luong = ?, mo_ta = ?, id_danhmuc = ? , id_company = ? " + 
        " , img = CASE WHEN ? IS NOT NULL THEN ? ELSE img END" +
        " WHERE id_sanpham = ?";
        const [result] =  await connect.execute(query , [newProduct.name , newProduct.price , newProduct.number , newProduct.mota , newProduct.id_danhmuc, newProduct.id_company , newProduct.img , newImg , id]);
        return result;
    } catch (error) {
        throw error;
    }
}

Product.GetCountBook = async function () {
  try {
    const query = "SELECT COUNT(*) AS total_book FROM sanpham;";
    const [result] = await connect.execute(query);
    return result[0]["total_book"];
  } catch (error) {
    throw error;
  }
};

Product.UpdateQuatity = async function(qty , id_pr){
    try {
        const query = "UPDATE `sanpham` SET `so_luong` = ? WHERE `sanpham`.`id_sanpham` = ?" ;
        const result = await connect.execute(query , [qty , id_pr]);
        return result ;
    } catch (error) {
        throw error ;
    }
}

module.exports = Product;