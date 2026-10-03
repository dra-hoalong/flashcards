# Dra_Hoalong's Flashcards Pro (PWA Offline)

Ứng dụng web học từ vựng tiếng Anh cá nhân (Flashcards Pro v7), chạy trực tiếp trên trình duyệt web, không cần server backend hay database online.

---

## 📱 Hướng dẫn sử dụng PWA & Chế độ Offline

### 1. Cài đặt Progressive Web App (PWA) trên Safari (iOS / iPadOS / macOS)
1. **Lần đầu tiên**: Mở liên kết GitHub Pages của ứng dụng bằng trình duyệt **Safari** khi có kết nối Internet.
2. **Cho phép Cache hoàn tất**: Đợi ứng dụng tải toàn bộ tài nguyên (Tailwind CSS, SheetJS, FontAwesome icon và Service Worker). Thẻ `OFFLINE READY` sẽ xuất hiện ở thanh tiêu đề khi ứng dụng sẵn sàng.
3. **Thêm vào Màn hình chính (Add to Home Screen)**:
   - **iPhone / iPad**: Chạm vào nút **Chia sẻ (Share)** ở góc dưới Safari ➔ Chọn **"Thêm vào Màn hình chính" (Add to Home Screen)**.
   - **MacBook (macOS Sonoma+)**: Vào menu **Tệp (File)** ➔ Chọn **"Thêm vào Dock" (Add to Dock)**.
4. **Học Offline 100%**: Khi không có mạng Internet, bạn chỉ cần mở biểu tượng ứng dụng từ Màn hình chính/Dock để học Flashcard, ôn tập Quiz/Typing, Nâng sao và Review tốt nghiệp trơn tru.

---

## 🔄 Chuyển giao dữ liệu giữa nhiều thiết bị (Multi-device Backup/Restore)

Dữ liệu tiến trình học tập của bạn được lưu trữ an toàn trong `localStorage` của từng thiết bị. **Ứng dụng không sử dụng đồng bộ đám mây tự động (Cloud Sync)** để đảm bảo quyền riêng tư và hoạt động mượt mà khi offline.

### Quy trình chuyển giao tiến trình học từ Thiết bị A ➔ Thiết bị B:
1. **Trên Thiết bị A (Đang học chính)**:
   * Vào **Quản lý Bộ thẻ** ➔ Nhấn **Sao lưu**.
   * Tệp bản sao lưu `flashcards-backup.json` sẽ được tải về thiết bị.
2. **Chuyển tệp sao lưu**:
   * Gửi tệp `flashcards-backup.json` sang Thiết bị B (qua AirDrop, Messages, iCloud Drive, Email,...).
3. **Trên Thiết bị B**:
   * Mở ứng dụng ➔ Vào **Quản lý Bộ thẻ** ➔ Nhấn **Khôi phục**.
   * Chọn tệp `flashcards-backup.json`.
   * Kiểm tra bảng tóm tắt tiến trình (Tổng từ, Số từ đã học, Chờ tốt nghiệp, Tốt nghiệp) và chọn **OK (Xác nhận)** để khôi phục và tiếp tục học.

---

## 🛡️ Bảo toàn dữ liệu & Cập nhật ứng dụng

- **An toàn tuyệt đối**: Việc cập nhật phiên bản mới của ứng dụng hay làm sạch bộ nhớ tạm của Service Worker **tuyệt đối không làm mất hay ảnh hưởng đến dữ liệu `localStorage`** của bạn.
- **An toàn khi Restore**: Bất kỳ tệp sao lưu hỏng hoặc thiếu trường bắt buộc nào sẽ bị hệ thống từ chối an toàn, giữ nguyên dữ liệu hiện tại của bạn.
