- 1. Open Docker
- 2. Open Table plus
- 3. Create new a database in table plus
- 4. Right click Tables => import => From SQL dump.. => select file db_images.sql
- 5. Import file capstone_express_ORM.postman_collection.json in Postman
## Task: Võ Minh Nhân
Trang đăng nhập, đăng ký:
- POST trang đăng ký: [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
- POST trang đăng nhập: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

Trang quản lý ảnh:
- GET thông tin user: [http://localhost:3000/user/getInfo](http://localhost:3000/user/getInfo)
- GET danh sách ảnh đã lưu theo user id: [http://localhost:3000/image/getSavedImage](http://localhost:3000/image/getSavedImage)
- GET danh sách ảnh đã tạo theo user id: [http://localhost:3000/image/getCreatedImage](http://localhost:3000/image/getCreatedImage)
- DELETE xóa ảnh đã tạo theo id ảnh: [http://localhost:3000/image/delete/:id](http://localhost:3000/image/delete/:id)

Trang thêm ảnh:
- POST thêm một ảnh của user: [http://localhost:3000/image/add](http://localhost:3000/image/add)

## Task: Nguyễn Văn Sỹ
Trang chủ:
- GET danh sách ảnh về:
- GET tìm kiếm danh sách ảnh theo tên:

Trang chi tiết:
- GET thông tin ảnh và người tạo ảnh bằng id ảnh:
- GET thông tin bình luận theo id ảnh:
- GET thông tin đã lưu hình này chưa theo id ảnh:
- POST để lưu thông tin bình luận của người dùng với hình ảnh:

Chỉnh sửa thông tin cá nhân
- PUT thông tin cá nhân của user:
