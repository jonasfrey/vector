deno run -A localhost/create_dynamic.js  && mv created_dynamic_generated.js localhost/ && deno test -A test_server.js  && deno run -A generate_readme.js
