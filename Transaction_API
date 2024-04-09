package com;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/transaction")
public class Transaction_db extends HttpServlet 
{
    private static final long serialVersionUID = 1L;

    private static final String url = "jdbc:mysql://localhost:3306/financial";
    private static final String user = "root";
    private static final String password = "Pravallika@1722";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
        	Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
            PrintWriter out = response.getWriter();
            out.println("Connected to the database\n");

            // Inserting a new customer
            insertCustomer(conn, "John Doe", "john@example.com");

            // Inserting a new transaction
            insertTransaction(conn, 1, 100.50);

            // Retrieving transactions for a customer
            getTransactionsForCustomer(conn, 1, out);

        } 
        catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        } finally {
            try {
                if (conn != null) conn.close();
                if (pstmt != null) pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private void insertCustomer(Connection conn, String name, String email) throws SQLException {
        String query = "INSERT INTO customers (name, email) VALUES (?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.executeUpdate();
        }
    }

    private void insertTransaction(Connection conn, int customerId, double amount) throws SQLException {
        String query = "INSERT INTO transactions (customer_id, amount, transaction_date) VALUES (?, ?, NOW())";
        try (PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setInt(1, customerId);
            pstmt.setDouble(2, amount);
            pstmt.executeUpdate();
        }
    }

    private void getTransactionsForCustomer(Connection conn, int customerId, PrintWriter out) throws SQLException {
        String query = "SELECT * FROM transactions WHERE customer_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setInt(1, customerId);
            ResultSet rs = pstmt.executeQuery();
            out.println("Transactions for customer " + customerId + ":");
            while (rs.next()) {
                out.println("Transaction ID: " + rs.getInt("transaction_id") +
                        ", Amount: " + rs.getDouble("amount") +
                        ", Date: " + rs.getTimestamp("transaction_date"));
            }
        }
    }
}


<!---- web.xml code ----!>

<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <servlet>
        <servlet-name>TransactionServlet</servlet-name>
        <servlet-class>com.TransactionServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>TransactionServlet</servlet-name>
        <url-pattern>/transaction</url-pattern>
    </servlet-mapping>

</web-app>
