require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../getPool")();

const migrate = async () => {
  try {
    console.log("🔧 Importando datos...");

    const hashedPassword = await bcrypt.hash("123456", 10);

    await pool.query(`
        INSERT INTO users (first_name, last_name, email, hashed_password, bio, is_admin, is_active, activation_code) VALUES
        ('Hugibert', 'Sheather', 'admin@cow-ork.com', '${hashedPassword}', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus felis arcu, consectetur non accumsan vitae, commodo in libero. Vestibulum nec purus ut arcu accumsan semper ut at leo. Ut placerat pellentesque turpis porta bibendum. Praesent eget.', 1, 1, ''),
        ('Falito', 'Hunnisett', 'fhunnisett1@archive.org', '${hashedPassword}', 'Proin porttitor enim tellus, vitae tempor est tincidunt et. Cras ut leo vitae enim luctus aliquet et vitae libero. Duis sit amet egestas sem. Aenean vitae elit et lectus tincidunt congue.', 0, 1, ''),
        ('Bunny', 'Jefferson', 'bjefferson2@google.co.jp', '${hashedPassword}', 'Aliquam tincidunt elementum mauris, eu tristique quam bibendum a.', 0, 1, ''),
        ('Bibbye', 'Hearty', 'bhearty3@hc360.com', '${hashedPassword}', 'Pellentesque eu feugiat tellus. Aenean tincidunt pharetra velit, eu feugiat libero tincidunt at. Nulla vitae sem non purus vestibulum vestibulum. Praesent auctor accumsan vulputate. Nulla porta tellus a metus luctus vestibulum.', 0, 1, ''),
        ('Percival', 'Lambertazzi', 'plambertazzi4@huffingtonpost.com', '${hashedPassword}', 'Maecenas aliquam nisl laoreet dignissim laoreet. Sed accumsan tempus venenatis. Etiam viverra luctus dui id vestibulum. Nullam vel risus non nisl volutpat vehicula.', 0, 1, ''),
        ('Beatrice', 'Phette', 'bphette5@narod.ru', '${hashedPassword}', 'Pellentesque eu feugiat tellus. Aenean tincidunt pharetra velit, eu feugiat libero tincidunt at. Nulla vitae sem non purus vestibulum vestibulum. Praesent auctor accumsan vulputate.', 0, 1, ''),
        ('Tod', 'Wiper', 'twiper6@fda.gov', '${hashedPassword}', 'Ut leo leo, cursus sed metus quis, posuere aliquam nisl. Vestibulum eget bibendum lorem, non fermentum sem.', 0, 1, ''),
        ('Renae', 'Strickland', 'rstrickland7@wired.com', '${hashedPassword}', 'Pellentesque eu feugiat tellus. Aenean tincidunt pharetra velit, eu feugiat libero tincidunt at.', 0, 1, ''),
        ('Donia', 'Marwood', 'dmarwood8@nationalgeographic.com', '${hashedPassword}', 'Morbi ultrices pellentesque dui eget cursus. Maecenas ullamcorper felis non pharetra fringilla. Cras porta volutpat libero blandit imperdiet.', 0, 1, ''),
        ('Alexio', 'Thorndale', 'athorndale9@nsw.gov.au', '${hashedPassword}', 'Nam finibus, ex non iaculis tempor, eros leo ultricies magna, vel molestie elit eros a nulla. Maecenas vel maximus ligula, quis semper velit. Vivamus a ipsum leo.', 0, 1, '');
    `);
    console.log("Users");
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
    console.log("services");
    await pool.query(`
        INSERT INTO report_categories (name) VALUES
        ('Reformas'),
        ('Catástrofes naturales'),
        ('Inhabilitado'),
        ('Avería'),
        ('Otros');
    `);
    console.log("report_categories");
    await pool.query(`
        INSERT INTO space_types (name) VALUES
        ('Oficina compartida'),
        ('Oficina privada'),
        ('Oficina virtual'),
        ('Escritorio dedicado'),
        ('Sala de reuniones');
    `);
    console.log("space_types");
    await pool.query(`
        INSERT INTO spaces (name, description, address, price, capacity, is_clean, type_id) VALUES
        ('Espacio polaris', 'Integer eget odio vitae ex venenatis tristique placerat non nulla. Etiam auctor sed urna ac euismod. Integer fermentum arcu vel eros vulputate elementum.', '11 Mosinee Avenue', '526.21', 2, true, 5),
        ('The comaking space', 'Pellentesque eu feugiat tellus. Aenean tincidunt pharetra velit, eu feugiat libero tincidunt at. Nulla vitae sem non purus vestibulum vestibulum. Praesent auctor accumsan vulputate. Nulla porta tellus a metus luctus vestibulum. Cras faucibus semper magna, id luctus arcu viverra eu. Etiam eleifend tempus consequat. Donec maximus tincidunt condimentum.', '0 Nancy Pass', '309.93', 6, true, 4),
        ('Centro samsara', 'Maecenas aliquam nisl laoreet dignissim laoreet. Sed accumsan tempus venenatis. Etiam viverra luctus dui id vestibulum. Nullam vel risus non nisl volutpat vehicula. Ut pellentesque accumsan nibh sed posuere. Sed sagittis bibendum dolor id pulvinar. Integer sollicitudin ac neque eu laoreet. Maecenas mollis sapien dignissim, dictum nisl ac, pharetra tortor. Duis iaculis luctus imperdiet. Nulla ac tempor orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at risus pretium, mollis odio nec, viverra felis. Praesent ullamcorper dignissim neque ut ultricies. Integer eget odio vitae ex venenatis tristique placerat non nulla. Etiam auctor sed urna ac euismod. Integer fermentum arcu vel eros vulputate elementum.', '38636 Continental Way', '812.45', 8, false, 1),
        ('Centro armonía', 'Proin porttitor enim tellus, vitae tempor est tincidunt et. Cras ut leo vitae enim luctus aliquet et vitae libero.', '788 Talisman Drive', '344.54', 7, true, 1),
        ('Estudi30', 'Ut placerat pellentesque turpis porta bibendum. Praesent eget volutpat enim. Donec auctor, mi ut pulvinar porttitor, est odio scelerisque dolor, sed mollis dui sem non est.', '083 Nevada Drive', '398.31', 1, false, 5),
        ('El ático del coworking', 'Maecenas vel maximus ligula, quis semper velit. Vivamus a ipsum leo. Mauris tortor nibh, efficitur a quam aliquam, tincidunt sollicitudin mauris.', '23392 Holmberg Court', '479.11', 8, true, 5),
        ('Maui beach cowork', 'Aliquam tincidunt elementum mauris, eu tristique quam bibendum a. Pellentesque sit amet ultricies odio. Quisque cursus mi non maximus tempor. Nulla leo purus, eleifend sed nisl vel, convallis porttitor magna.', '559 Old Shore Way', '526.87', 1, false, 5),
        ('Crescendo', 'Mauris suscipit ex et urna venenatis, non iaculis nunc sagittis. Vestibulum vitae velit efficitur, vehicula massa sed, tempor eros. Sed auctor nisi eget vehicula maximus. Aenean auctor neque lacus, sit amet molestie augue pulvinar ut. Praesent vitae nisi feugiat, porta sem non, gravida justo.', '15903 Kedzie Alley', '755.47', 9, true, 3),
        ('Triple7', 'Sed accumsan tempus venenatis. Etiam viverra luctus dui id vestibulum.', '29 Burrows Alley', '427.13', 1, true, 3),
        ('Level up', 'Duis sit amet egestas sem. Aenean vitae elit et lectus tincidunt congue. Integer eget felis sed tortor venenatis lobortis at eu velit.', '3315 Talisman Terrace', '833.22', 2, false, 3),
        ('La planta coworking', 'Duis ultricies pulvinar urna a gravida. Aenean ultrices odio lorem, et pharetra enim dignissim ac. Ut id sem nisl. Duis vitae est eget lorem dignissim congue ut vitae elit. Praesent dignissim neque in posuere lacinia.', '1659 Ridgeway Pass', '348.25', 5, false, 2),
        ('Eixam de gracia', 'In cursus tortor a urna pellentesque gravida. Sed sagittis ullamcorper elit, quis vulputate ex euismod nec.', '3174 Hermina Crossing', '398.49', 2, true, 2),
        ('La fábrica de cajas', 'Suspendisse potenti. Vestibulum ut diam cursus, ornare odio sed, vehicula sapien. Sed a tellus sed turpis faucibus accumsan. Maecenas pharetra condimentum tortor, in consequat tortor tristique non. Vivamus eu lorem enim.', '4949 Norway Maple Parkway', '483.29', 8, true, 4),
        ('Erika park', 'Vivamus non ullamcorper tortor, vel hendrerit nisl. Nulla et justo quis odio cursus egestas. Cras ac aliquam est. Donec tincidunt venenatis blandit.', '33 Ramsey Crossing', '953.70', 1, false, 5),
        ('Artico', 'Maecenas non tortor ornare, aliquam nibh quis, blandit leo. Praesent ullamcorper sem nec neque tincidunt auctor. Nunc ligula neque, posuere ac tellus id, suscipit aliquam sem. Donec et arcu velit. Sed id urna placerat, commodo mi nec, pretium nisi. Quisque convallis molestie sem, vel sagittis nibh sollicitudin eget. Suspendisse interdum leo lorem, sed congue augue blandit dignissim.', '2052 Fairview Way', '256.62', 2, true, 3);
    `);
    console.log("spaces");
    await pool.query(`
        INSERT INTO bookings (space_id, user_id, start_date, end_date) VALUES
        (1, 4, '2022-4-15', '2022-8-15'),
        (2, 8, '2021-6-6', '2022-6-6'),
        (4, 5, '2022-7-6', '2022-10-6'),
        (5, 9, '2022-7-8', '2022-8-8'),
        (5, 10, '2022-8-10', '2022-10-10'),
        (7, 8, '2021-1-25', '2021-6-25'),
        (7, 2, '2021-11-7', '2022-2-7'),
        (8, 4, '2022-4-14', '2022-4-21'),
        (9, 6, '2023-1-16', '2024-1-16'),
        (12, 1, '2021-9-10', '2021-10-10'),
        (12, 2, '2021-11-23', '2021-12-11'),
        (12, 10, '2022-3-10', '2022-5-10'),
        (12, 5, '2022-1-15', '2022-1-29'),
        (13, 2, '2022-5-20', '2022-6-20'),
        (13, 6, '2022-8-12', '2022-10-12');
    `);
    console.log("bookings");
    await pool.query(`
        INSERT INTO reports (space_id, user_id, category_id, description, status) VALUES
        (9, 5, 5, 'Aenean ultrices odio lorem, et pharetra enim dignissim ac. Ut id sem nisl. Duis vitae est eget lorem dignissim congue ut vitae elit. Praesent dignissim neque in posuere lacinia.', 'CLOSED'),
        (9, 10, 3, 'Mauris sapien elit, suscipit at consectetur et, venenatis at risus. Maecenas egestas ultrices nibh nec blandit.', 'CLOSED'),
        (7, 3, 1, 'Cras ac aliquam est. Donec tincidunt venenatis blandit.', 'PENDING'),
        (13, 1, 1, 'Cras felis orci, pharetra facilisis iaculis congue, convallis at ipsum. Duis purus velit, finibus at ultrices non, mattis sed ipsum.', 'OPEN'),
        (15, 10, 1, 'Cras sit amet dui porta tortor sagittis blandit. Quisque et malesuada magna. Integer ultricies convallis magna. Nunc quis diam in lorem condimentum posuere a vel diam. Curabitur consectetur fermentum erat, sed imperdiet justo pulvinar ac. Interdum et malesuada fames ac ante ipsum primis in faucibus.', 'PENDING'),
        (5, 10, 4, 'Ut hendrerit libero lacus, sit amet imperdiet libero commodo vel. Nullam metus metus, lacinia malesuada rhoncus vel, consectetur at arcu.', 'OPEN'),
        (14, 7, 4, 'In cursus tortor a urna pellentesque gravida. Sed sagittis ullamcorper elit, quis vulputate ex euismod nec. Vestibulum at felis in nisi cursus porta. Donec ultrices, massa non pulvinar tempor, felis mi dictum arcu, nec dictum lectus enim eget lacus. Nulla id eros euismod, tempus ipsum eget, ultricies enim. Morbi posuere neque ut finibus condimentum. Maecenas rutrum nunc non mi ultrices vehicula. Suspendisse lacinia at nibh ac consequat. Donec facilisis ut nunc vel convallis.', 'PENDING'),
        (7, 7, 3, 'Nulla mattis elementum orci eu sodales. Curabitur et diam metus. Sed bibendum id velit eget consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus ac dolor eu tellus pharetra vestibulum at ut lorem.', 'CLOSED'),
        (15, 7, 3, 'Quisque eu lorem sodales, fringilla ipsum quis, porttitor arcu. Quisque maximus nunc blandit neque sagittis, nec vulputate turpis sodales.', 'PENDING'),
        (1, 3, 1, 'Duis purus velit, finibus at ultrices non, mattis sed ipsum. In non auctor ante.', 'CLOSED'),
        (15, 4, 3, 'Donec facilisis ut nunc vel convallis. Maecenas feugiat nisi eu sollicitudin suscipit. Suspendisse ac mauris et odio iaculis placerat at ut metus. Duis ultricies pulvinar urna a gravida.', 'OPEN'),
        (15, 3, 4, 'Cras felis orci, pharetra facilisis iaculis congue, convallis at ipsum. Duis purus velit, finibus at ultrices non, mattis sed ipsum. In non auctor ante.', 'CLOSED'),
        (1, 1, 5, 'Aliquam pretium sollicitudin volutpat. Quisque eu lorem sodales, fringilla ipsum quis, porttitor arcu. Quisque maximus nunc blandit neque sagittis, nec vulputate turpis sodales. Maecenas auctor eros vel augue sodales, ac eleifend erat scelerisque.', 'OPEN'),
        (10, 5, 5, 'Donec eget lacus eget est tempus congue sed id odio. Sed maximus nibh vel ornare dapibus. Aenean at pharetra est. Maecenas ac dui sed ligula blandit luctus eu vitae mi. Mauris non turpis ornare, viverra ante at, rutrum tortor. Nunc laoreet fringilla congue. Integer ultricies condimentum lorem.', 'CLOSED'),
        (13, 4, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec gravida nibh. Morbi rhoncus lacinia dui, vel lacinia nisi pellentesque id.', 'PENDING'),
        (2, 7, 4, 'In hac habitasse platea dictumst. Phasellus aliquet ut tellus id consequat. Mauris consectetur egestas orci, consectetur suscipit magna mattis eu. Donec eu iaculis purus, eleifend finibus quam.', 'OPEN'),
        (3, 3, 4, 'In vel semper diam, ut lobortis neque. Sed vel velit pulvinar, fringilla elit in, pulvinar sem.', 'PENDING'),
        (4, 9, 3, 'Mauris non turpis ornare, viverra ante at, rutrum tortor. Nunc laoreet fringilla congue. Integer ultricies condimentum lorem.', 'CLOSED'),
        (7, 4, 5, 'Donec laoreet condimentum mi, quis sagittis sem interdum luctus. Donec aliquet felis nec risus auctor mattis. Maecenas ac pellentesque nunc. Donec eget lacus eget est tempus congue sed id odio. Sed maximus nibh vel ornare dapibus. Aenean at pharetra est. Maecenas ac dui sed ligula blandit luctus eu vitae mi.', 'CLOSED'),
        (3, 7, 4, 'Fusce vulputate dui nec felis tempor venenatis. Duis a nulla turpis.', 'OPEN');
    `);
    console.log("reports");
    await pool.query(`
        INSERT INTO space_services (space_id, service_id) VALUES
        (1, 2),
        (2, 2),
        (2, 4),
        (2, 7),
        (2, 10),
        (3, 2),
        (3, 3),
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
        (8, 9),
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
        (15, 9);
    `);
    console.log("space_services");
    await pool.query(`
        INSERT INTO space_ratings (space_id, user_id, rating) VALUES
        (1, 4, 3),
        (2, 8, 4),
        (5, 9, 4),
        (5, 10, 5),
        (6, 1, 4),
        (6, 9, 5),
        (7, 8, 4),
        (7, 2, 2),
        (8, 4, 2),
        (9, 6, 5),
        (12, 10, 4),
        (12, 1, 4),
        (12, 2, 5),
        (13, 2, 5),
        (13, 6, 5);
    `);
    console.log("✅ Datos importados correctamente.");
    process.exit(0);
  } catch (error) {
    console.error(`❌ ${error}`);
    process.exit(1);
  }
};

migrate();
