- 1 - Open Docker
- 2 - Open Table plus
- 3 - Create new a database in table plus
- 4 - Right click Tables => import => From SQL dump.. => select file db_images.sql
- 5 - Import file Capstone Express.postman_collection.json in Postman
## Task: Võ Minh Nhân
Trang đăng nhập, đăng ký:
- POST trang đăng ký: [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
- POST trang đăng nhập: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

Trang quản lý ảnh:
- GET thông tin user: [http://localhost:3000/user/get-info](http://localhost:3000/user/get-info)
- GET danh sách ảnh đã lưu theo user id: [http://localhost:3000/user/get-saved-images](http://localhost:3000/user/get-saved-images)
- GET danh sách ảnh đã tạo theo user id: [http://localhost:3000/user/get-created-images](http://localhost:3000/user/get-created-images)
- DELETE xóa ảnh đã tạo theo id ảnh: [http://localhost:3000/user/delete-image/:id](http://localhost:3000/user/delete-image/:id)

Trang thêm ảnh:
- POST thêm một ảnh của user: [http://localhost:3000/user/add-image](http://localhost:3000/user/add-image)

## Task: Nguyễn Văn Sỹ
Trang chủ:
- GET danh sách ảnh về: [http://localhost:3000/home/getImages?page=1&pageSize=5](http://localhost:3000/home/getImages?page=1&pageSize=3)
- GET tìm kiếm danh sách ảnh theo tên:[http://localhost:3000/home/getImageByName?page=1&pageSize=5&search=abc](http://localhost:3000/home/getImageByName?page=1&pageSize=1&search=a)

Trang chi tiết:
- GET thông tin ảnh và người tạo ảnh bằng id ảnh:[http://localhost:3000/image/getDetailImage/:id](http://localhost:3000/image/getDetailImage/:id)
- GET thông tin bình luận theo id ảnh:[http://localhost:3000/comment/commentImage/:id](http://localhost:3000/comment/commentImage/:id)
- GET thông tin đã lưu hình này chưa theo id ảnh:[http://localhost:3000/image/checkSaveImage/:id](http://localhost:3000/image/checkSaveImage/:id)
- POST để lưu thông tin bình luận của người dùng với hình ảnh:[http://localhost:3000/comment/commentImage/:id](http://localhost:3000/comment/commentImage/:id)

Chỉnh sửa thông tin cá nhân
- PUT thông tin cá nhân của user:[http://localhost:3000/user/editUserInfo](http://localhost:3000/user/editUserInfo)
