// import { up } from "./001_create_message_table.js";
// import { up } from "./002_add_images_to_table.js";
// import { up } from "./003_adaptation_of_messages_table.js";
// import { up } from "./004_create_admin_table.js";
// import { up } from "./005_alter_column_curation_name.js";
// import { up } from "./006_alter_column_pathImages.js";
// import { up } from "./007_alter_column_date_of_event.js";
import { up } from "./008_create_galery_table.js";

(async () => {
    try {
        console.log("Running migrations...");
        await up();
        console.log("Migrations completed successfully.");
        process.exit(0);
    }
    catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
})();