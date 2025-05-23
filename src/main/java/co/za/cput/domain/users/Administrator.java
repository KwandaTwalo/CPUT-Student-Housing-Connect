package co.za.cput.domain.users;


public class Administrator {
    private Integer adminId;
    private String name;
    private String surname;
    private String email;
    private String phoneNumber;
    private String password;

    protected Administrator(){}
    private Administrator(Builder builder){
        this.adminId = builder.adminId;
        this.name = builder.name;
        this.surname = builder.surname;
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
        this.password = builder.password;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "Administrator{" +
                "adminId=" + adminId +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public static class Builder {
        private Integer adminId;
        private String name;
        private String surname;
        private String email;
        private String phoneNumber;
        private String password;

        public Builder setAdminId(Integer adminId) {
            this.adminId = adminId;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setSurname(String surname) {
            this.surname = surname;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder copy(Administrator admin){
            return new Builder()
                    .setAdminId(admin.getAdminId())
                    .setName(admin.getName())
                    .setSurname(admin.getSurname())
                    .setEmail(admin.getEmail())
                    .setPhoneNumber(admin.getPhoneNumber())
                    .setPassword(admin.getPassword());
        }

        public Administrator build(){
            return new Administrator(this);
        }
    }
}
