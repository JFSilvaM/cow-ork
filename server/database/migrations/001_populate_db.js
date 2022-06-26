require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../getPool")();

const migrate = async () => {
  try {
    console.log("🔧 Importando datos...");

    const hashedPassword = await bcrypt.hash("123456", 10);

    await pool.query(`
        INSERT INTO users (first_name, last_name, email, hashed_password, bio, is_admin, is_active, activation_code) VALUES
        ('Hugibert', 'Sheather', 'admin@cow-ork.com', '${hashedPassword}', 'Low Dose Rate (LDR) Brachytherapy of Tongue using Iodine 125 (I-125)', 1, 1, ''),
        ('Falito', 'Hunnisett', 'fhunnisett1@archive.org', '${hashedPassword}', 'Repair Thoracolumbar Vertebral Disc, Open Approach', 0, 1, ''),
        ('Bunny', 'Jefferson', 'bjefferson2@google.co.jp', '${hashedPassword}', 'Fusion of Left Knee Joint with Autologous Tissue Substitute, Percutaneous Endoscopic Approach', 0, 1, ''),
        ('Bibbye', 'Hearty', 'bhearty3@hc360.com', '${hashedPassword}', 'Reposition Pudendal Nerve, Open Approach', 0, 1, ''),
        ('Percival', 'Lambertazzi', 'plambertazzi4@huffingtonpost.com', '${hashedPassword}', 'Supplement Left Femoral Vein with Nonautologous Tissue Substitute, Open Approach', 0, 1, ''),
        ('Beatrice', 'Phette', 'bphette5@narod.ru', '${hashedPassword}', 'Excision of Lung Lingula, Percutaneous Endoscopic Approach, Diagnostic', 0, 1, ''),
        ('Tod', 'Wiper', 'twiper6@fda.gov', '${hashedPassword}', 'Excision of Olfactory Nerve, Percutaneous Endoscopic Approach, Diagnostic', 0, 1, ''),
        ('Renae', 'Strickland', 'rstrickland7@wired.com', '${hashedPassword}', 'Bypass Right Common Iliac Artery to Bilateral Common Iliac Arteries with Synthetic Substitute, Percutaneous Endoscopic Approach', 0, 1, ''),
        ('Donia', 'Marwood', 'dmarwood8@nationalgeographic.com', '${hashedPassword}', 'Supplement Right Sphenoid Bone with Synthetic Substitute, Percutaneous Approach', 0, 1, ''),
        ('Alexio', 'Thorndale', 'athorndale9@nsw.gov.au', '${hashedPassword}', 'Extirpation of Matter from Epidural Space, Open Approach', 0, 1, '');
    `);

    await pool.query(`
        INSERT INTO services (name) VALUES
        ('Wi-Fi'),
        ('Impresora'),
        ('Cafetera'),
        ('Proyector'),
        ('Parking'),
        ('Recepción'),
        ('Aire acondicionado'),
        ('Cocina'),
        ('Pizarra'),
        ('Sofá');
    `);

    await pool.query(`
        INSERT INTO report_categories (name) VALUES
        ('Reformas'),
        ('Catástrofes naturales'),
        ('Inhabilitado'),
        ('Avería'),
        ('Otros');
    `);

    await pool.query(`
        INSERT INTO space_types (name) VALUES
        ('Oficina compartida'),
        ('Oficina privada'),
        ('Oficina virtual'),
        ('Escritorio dedicado'),
        ('Sala de reuniones');
    `);

    await pool.query(`
        INSERT INTO spaces (name, description, address, price, capacity, is_clean, type_id) VALUES
        ('Blogtags', 'Excision of lingual tonsil', '11 Mosinee Avenue', '526.21', 2, true, 5),
        ('Thoughtblab', 'Other reconstruction of eyelid, full-thickness', '0 Nancy Pass', '309.93', 6, true, 4),
        ('LiveZ', 'Pulmonary artery wedge monitoring', '38636 Continental Way', '812.45', 8, false, 1),
        ('DabZ', 'Other partial adrenalectomy', '788 Talisman Drive', '344.54', 7, true, 1),
        ('Yotz', 'Closure of other fistula of ureter', '083 Nevada Drive', '398.31', 1, false, 5),
        ('Kwinu', 'Repair of oval and round windows', '23392 Holmberg Court', '479.11', 8, true, 5),
        ('Photobug', 'Other operations on eyelids', '559 Old Shore Way', '526.87', 1, false, 5),
        ('Twitternation', 'Wedge osteotomy, unspecified site', '15903 Kedzie Alley', '755.47', 9, true, 3),
        ('Youtags', 'Replacement or repair of other implantable component of (total) replacement heart system', '29 Burrows Alley', '427.13', 1, true, 3),
        ('Topicware', 'Other transfusion of whole blood', '3315 Talisman Terrace', '833.22', 2, false, 3),
        ('Meetz', 'Subtalar fusion', '1659 Ridgeway Pass', '348.25', 5, false, 2),
        ('Brightbean', 'Other gastrostomy', '3174 Hermina Crossing', '398.49', 2, true, 2),
        ('Zooveo', 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, culture and sensitivity', '4949 Norway Maple Parkway', '483.29', 8, true, 4),
        ('Avaveo', 'Other tomography of head', '33 Ramsey Crossing', '953.70', 1, false, 5),
        ('Leexo', 'Wedge osteotomy, humerus', '2052 Fairview Way', '256.62', 2, true, 3);
    `);

    await pool.query(`
        INSERT INTO bookings (space_id, user_id, start_date, end_date, is_paid) VALUES
        (12, 2, '2022-6-7', '2022-6-11', false),
        (2, 8, '2022-6-8', '2022-6-14', false),
        (4, 5, '2022-6-6', '2022-6-12', true),
        (7, 2, '2022-6-7', '2022-6-13', true),
        (1, 4, '2022-6-9', '2022-6-12', false),
        (13, 3, '2022-6-6', '2022-6-13', true),
        (12, 1, '2022-6-10', '2022-6-13', true),
        (12, 3, '2022-6-7', '2022-6-12', true),
        (7, 8, '2022-6-9', '2022-6-11', true),
        (5, 9, '2022-6-9', '2022-6-14', false),
        (9, 6, '2022-6-7', '2022-6-11', false),
        (8, 4, '2022-6-7', '2022-6-11', false),
        (13, 2, '2022-6-6', '2022-6-13', false),
        (5, 10, '2022-6-10', '2022-6-11', false),
        (12, 5, '2022-6-10', '2022-6-11', true);
    `);

    await pool.query(`
        INSERT INTO reports (space_id, user_id, category_id, description, status) VALUES
        (9, 5, 5, 'Other local excision or destruction of lesion of joint, unspecified site', 'CLOSED'),
        (9, 10, 3, 'Ligation of vas deferens', 'CLOSED'),
        (7, 3, 1, 'Cricopharyngeal myotomy', 'PENDING'),
        (13, 1, 2, 'Removal of cystostomy tube', 'OPEN'),
        (15, 10, 1, 'Probing of lacrimal canaliculi', 'PENDING'),
        (5, 10, 2, 'Ventricular shunt to thoracic cavity', 'OPEN'),
        (14, 7, 4, 'Intraoperative cardiac pacemaker', 'PENDING'),
        (7, 7, 2, 'Endoscopic retrograde cholangiopancreatography [ERCP]', 'CLOSED'),
        (3, 7, 3, 'Repair of laryngeal fracture', 'PENDING'),
        (1, 3, 1, 'Excision or destruction of other lesion or tissue of heart, endovascular approach', 'CLOSED'),
        (15, 4, 3, 'Other diagnostic procedures on bladder', 'OPEN'),
        (15, 3, 4, 'Gynecological examination', 'CLOSED'),
        (1, 1, 5, 'Irrigation of eye', 'OPEN'),
        (10, 5, 5, 'Bursotomy of hand', 'CLOSED'),
        (13, 4, 4, 'Sequestrectomy, radius and ulna', 'PENDING'),
        (2, 7, 4, 'Other diagnostic procedures on ureter', 'OPEN'),
        (3, 3, 4, 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, parasitology', 'PENDING'),
        (4, 9, 3, 'Endarterectomy, lower limb arteries', 'CLOSED'),
        (7, 4, 5, 'Removal of intraluminal foreign body from pharynx without incision', 'CLOSED'),
        (3, 7, 4, 'Biopsy of blood vessel', 'OPEN');
    `);

    await pool.query(`
        INSERT INTO space_services (space_id, service_id) VALUES
        (1, 2),
        (2, 2),
        (2, 4),
        (2, 7),
        (2, 10),
        (3, 2),
        (3, 6),
        (4, 2),
        (4, 8),
        (5, 2),
        (5, 3),
        (5, 8),
        (6, 1),
        (6, 2),
        (7, 2),
        (7, 3),
        (8, 2),
        (8, 6),
        (9, 2),
        (9, 3),
        (10, 2),
        (10, 5),
        (11, 2),
        (11, 7),
        (11, 9),
        (12, 2),
        (12, 5),
        (13, 2),
        (13, 4),
        (14, 2),
        (14, 10),
        (15, 2),
        (15, 9)
    `);

    await pool.query(`
        INSERT INTO space_ratings (space_id, user_id, rating) VALUES
        (11, 10, 4),
        (12, 5, 4),
        (7, 7, 4),
        (8, 10, 2),
        (8, 6, 1),
        (5, 6, 4),
        (12, 7, 5),
        (9, 1, 5),
        (6, 1, 4),
        (2, 10, 4),
        (1, 8, 3),
        (6, 9, 5),
        (4, 4, 2),
        (8, 7, 2),
        (7, 6, 2),
        (2, 7, 3),
        (8, 9, 2),
        (10, 5, 3),
        (3, 10, 3),
        (9, 8, 3);
    `);
    console.log("✅ Datos importados correctamente.");
    process.exit(0);
  } catch (error) {
    console.error(`❌ ${error}`);
    process.exit(1);
  }
};

migrate();
