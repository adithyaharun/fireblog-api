export default class User {
  id?: string;
  name?: string;
  avatar?: string;
  biography?: string;
  status?: Boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(document?: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot, id?: string) {
    if (typeof document !== "undefined") {
      const data = document.data() || {};

      this.id = document.id;
      this.createdAt = (typeof document.createTime !== "undefined" ? document.createTime.toDate() : null);
      this.updatedAt = (typeof document.updateTime !== "undefined" ? document.updateTime.toDate() : null);

      this.name = data.name;
      this.avatar = data.avatar;
      this.biography = data.biography;
      this.status = data.status;
    }
  }
}