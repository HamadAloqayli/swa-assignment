import { user } from "../data/mockData";
import {
  Mail,
  Phone,
  Briefcase,
  User as UserIcon,
  Calendar,
  MapPin,
  Building,
  Clock,
} from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-32 translate-y-32"></div>
        </div>

        <div className="relative flex items-center gap-6">
          <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-lg">
            <UserIcon size={48} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">الملف الشخصي</h1>
            <p className="text-primary-100 mt-2 text-lg">
              معلوماتك الشخصية والوظيفية
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-8 h-full">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-36 h-36 rounded-full shadow-lg ring-4 ring-primary-100 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-primary-600 font-medium mt-2">
                {user.position}
              </p>
            </div>

            {/* Profile Content */}
            <div className="flex-1 space-y-4">
              {/* Personal Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                  <Calendar size={18} className="text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-500">تاريخ الميلاد</p>
                    <p className="text-sm font-medium">20 نوفمبر 1997</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                  <MapPin size={18} className="text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-500">المدينة</p>
                    <p className="text-sm font-medium">الرياض</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                  <Building size={18} className="text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-500">المكتب</p>
                    <p className="text-sm font-medium">الطابق الثالث - 301</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                  <Clock size={18} className="text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-500">ساعات العمل</p>
                    <p className="text-sm font-medium">8:00 ص - 5:00 م</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              معلومات الاتصال
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-primary-50 to-white rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    البريد الإلكتروني
                  </p>
                  <p className="text-base text-gray-800 mt-1 font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-white rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    رقم الهاتف
                  </p>
                  <p
                    className="text-base text-gray-800 mt-1 font-medium"
                    style={{ direction: "ltr" }}
                  >
                    {user.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-white rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                  <UserIcon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    المسمى الوظيفي
                  </p>
                  <p className="text-base text-gray-800 mt-1 font-medium">
                    {user.position}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">الإدارة</p>
                  <p className="text-base text-gray-800 mt-1 font-medium">
                    {user.department}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              معلومات إضافية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 font-medium">
                  تاريخ الانضمام
                </p>
                <p className="text-lg text-gray-800 mt-2 font-bold">
                  2023/01/15
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-500 font-medium">حالة الحساب</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="text-lg text-green-600 font-bold">نشط</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 font-medium">رقم الموظف</p>
                <p className="text-lg text-gray-800 mt-2 font-bold">
                  EMP-2023-001
                </p>
              </div>
              <div className="p-4 bg-primary-50 rounded-xl">
                <p className="text-sm text-gray-500 font-medium">الصلاحيات</p>
                <p className="text-lg text-primary-600 mt-2 font-bold">
                  مدير نظام
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
