import { useLanguage } from "../i18n/LanguageContext";

const AdminSettings = () => {
  const { t } = useLanguage();

  return (
    <>
      <h1>{t("admin.settings.title")}</h1>
      <p>{t("admin.settings.subtitle")}</p>
    </>
  );
};

export default AdminSettings;
