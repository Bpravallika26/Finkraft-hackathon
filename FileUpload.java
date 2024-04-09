package com;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet("/upload")
@MultipartConfig
public class FileUploadServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Part filePart = request.getPart("file"); // Retrieves CSV file
        InputStream fileContent = filePart.getInputStream();
        PrintWriter out = response.getWriter();

        try (Scanner scanner = new Scanner(fileContent)) {
            // Assuming CSV format: customerId,amount
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] parts = line.split(",");
                if (parts.length != 2) {
                    out.println("Invalid CSV format. Each line should have customerId and amount separated by a comma.");
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    return;
                }
                int customerId = Integer.parseInt(parts[0]);
                double amount;
                try {
                    amount = Double.parseDouble(parts[1]);
                } catch (NumberFormatException e) {
                    out.println("Invalid amount format for line: " + line);
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    return;
                }

                // Insert into database
                // (you can call a DAO method to insert the data)
            }
            out.println("File uploaded successfully.");
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            out.println("Internal server error occurred.");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}


<!--- web.xml code ---!>
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <servlet>
        <servlet-name>FileUploadServlet</servlet-name>
        <servlet-class>com.FileUploadServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>FileUploadServlet</servlet-name>
        <url-pattern>/upload</url-pattern>
    </servlet-mapping>

</web-app>


<!---- HTML Code----!>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>File Upload</title>
</head>
<body>
    <h2>Upload CSV File</h2>
    <form action="upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" accept=".csv">
        <button type="submit">Upload</button>
    </form>
</body>
</html>
