<?php
// Error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Ensure the log directory and file have appropriate permissions
$logFile = '/var/www/html/logs/usercookies.log';
if (!file_exists(dirname($logFile))) {
    mkdir(dirname($logFile), 0777, true);
}
if (!file_exists($logFile)) {
    touch($logFile);
    chmod($logFile, 0666);
}

// Get the JSON data from the request
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Prepare log entry
$logEntry = sprintf(
    "[%s] IP: %s, Device: %s\n",
    $data['timestamp'],
    $data['ip'],
    $data['device']
);

// Write log entry to file
if (file_put_contents($logFile, $logEntry, FILE_APPEND) === false) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to write to log file']);
} else {
    echo json_encode(['message' => 'Data logged successfully']);
}
