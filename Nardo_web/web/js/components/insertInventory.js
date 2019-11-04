/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function insertInventory(id) {
    
    /*"itemCategory": "extra2",
      "imgUrl": "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/409323/item/goods_15_409323.jpg",
      "description": "extra2",
      "color": "",
      "discount": "$10.00",
      "webUserId": "19",*/
    
    var content = `
    <div id="content">
            <div id="insertArea">
                <table>
                    <tr>
                        <td>Item Category</td>
                        <td><input type="text"  id="itemCategory" /></td>
                        <td id="itemCategoryError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Imnage URL</td>
                        <td><input type="text"  id="imgUrl" /></td>
                        <td id="imgUrlError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" id="description" /></td>
                        <td id="descriptionError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td><input type="text" id="color" /></td>
                        <td id="colorError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Discount</td>
                        <td><input type="text" id="discount" /></td>
                        <td id="discountError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Web User ID</td>
                        <td><input type="text" id="webUserId" /></td>
                        <td id="webUserIdError" class="error"></td>
                    </tr>
                    <tr>
                        <!-- see js/insertInventory.js to see the insertInventory function (make sure index.html references the js file) -->
                        <td><button onclick="inventoryCRUD.insert()">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>

    `;
    
    document.getElementById(id).innerHTML = content;

    
}