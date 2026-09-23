from database.db import SessionLocal, init_db, Train, Station, Schedule, LiveStatus, DelayHistory
from datetime import datetime, timedelta
import random

ALL_STATIONS = [
    {"code": "HYB", "name": "Hyderabad Deccan", "zone": "SCR", "state": "Telangana", "lat": 17.3850, "lon": 78.4867},
    {"code": "SC",  "name": "Secunderabad Jn", "zone": "SCR", "state": "Telangana", "lat": 17.4344, "lon": 78.5013},
    {"code": "KZJ", "name": "Kazipet Jn", "zone": "SCR", "state": "Telangana", "lat": 17.9750, "lon": 79.5100},
    {"code": "WL",  "name": "Warangal", "zone": "SCR", "state": "Telangana", "lat": 17.9689, "lon": 79.5941},
    {"code": "MB",  "name": "Mahabubabad", "zone": "SCR", "state": "Telangana", "lat": 17.6034, "lon": 80.0000},
    {"code": "KMT", "name": "Khammam", "zone": "SCR", "state": "Telangana", "lat": 17.2472, "lon": 80.1514},
    {"code": "BZA", "name": "Vijayawada Jn", "zone": "SCR", "state": "Andhra Pradesh", "lat": 16.5062, "lon": 80.6480},
    {"code": "GNT", "name": "Guntur Jn", "zone": "SCR", "state": "Andhra Pradesh", "lat": 16.3004, "lon": 80.4428},
    {"code": "TEL", "name": "Tenali Jn", "zone": "SCR", "state": "Andhra Pradesh", "lat": 16.2354, "lon": 80.6477},
    {"code": "OGL", "name": "Ongole", "zone": "SCR", "state": "Andhra Pradesh", "lat": 15.5057, "lon": 80.0499},
    {"code": "NLR", "name": "Nellore", "zone": "SCR", "state": "Andhra Pradesh", "lat": 14.4426, "lon": 79.9865},
    {"code": "GDR", "name": "Gudur Jn", "zone": "SCR", "state": "Andhra Pradesh", "lat": 14.1500, "lon": 79.8500},
    {"code": "MAS", "name": "MGR Chennai Central", "zone": "SR", "state": "Tamil Nadu", "lat": 13.0827, "lon": 80.2707},
    {"code": "MS",  "name": "Chennai Egmore", "zone": "SR", "state": "Tamil Nadu", "lat": 13.0784, "lon": 80.2612},
    {"code": "KPD", "name": "Katpadi Jn", "zone": "SR", "state": "Tamil Nadu", "lat": 12.9698, "lon": 79.1360},
    {"code": "JTJ", "name": "Jolarpettai Jn", "zone": "SR", "state": "Tamil Nadu", "lat": 12.5574, "lon": 78.5833},
    {"code": "SBC", "name": "KSR Bengaluru City", "zone": "SWR", "state": "Karnataka", "lat": 12.9784, "lon": 77.5684},
    {"code": "YPR", "name": "Yesvantpur Jn", "zone": "SWR", "state": "Karnataka", "lat": 13.0234, "lon": 77.5502},
    {"code": "MYS", "name": "Mysuru Jn", "zone": "SWR", "state": "Karnataka", "lat": 12.3160, "lon": 76.6455},
    {"code": "NDLS","name": "New Delhi", "zone": "NR", "state": "Delhi", "lat": 28.6448, "lon": 77.2167},
    {"code": "NZM", "name": "Hazrat Nizamuddin", "zone": "NR", "state": "Delhi", "lat": 28.5888, "lon": 77.2530},
    {"code": "AGC", "name": "Agra Cantt", "zone": "NCR", "state": "Uttar Pradesh", "lat": 27.1584, "lon": 77.9904},
    {"code": "GWL", "name": "Gwalior Jn", "zone": "NCR", "state": "Madhya Pradesh", "lat": 26.2167, "lon": 78.1833},
    {"code": "VGLJ","name": "Virangana Lakshmibai (Jhansi)", "zone": "NCR", "state": "Madhya Pradesh", "lat": 25.4484, "lon": 78.5685},
    {"code": "BPL", "name": "Bhopal Jn", "zone": "WCR", "state": "Madhya Pradesh", "lat": 23.2685, "lon": 77.4126},
    {"code": "RKMP","name": "Rani Kamlapati", "zone": "WCR", "state": "Madhya Pradesh", "lat": 23.2081, "lon": 77.4338},
    {"code": "ET",  "name": "Itarsi Jn", "zone": "WCR", "state": "Madhya Pradesh", "lat": 22.6108, "lon": 77.7610},
    {"code": "NGP", "name": "Nagpur Jn", "zone": "CR", "state": "Maharashtra", "lat": 21.1528, "lon": 79.0882},
    {"code": "BPQ", "name": "Balharshah Jn", "zone": "CR", "state": "Maharashtra", "lat": 19.8569, "lon": 79.3586},
    {"code": "MMCT","name": "Mumbai Central", "zone": "WR", "state": "Maharashtra", "lat": 18.9711, "lon": 72.8195},
    {"code": "CSMT","name": "Mumbai CSMT", "zone": "CR", "state": "Maharashtra", "lat": 18.9401, "lon": 72.8356},
    {"code": "PUNE","name": "Pune Jn", "zone": "CR", "state": "Maharashtra", "lat": 18.5284, "lon": 73.8739},
    {"code": "ST",  "name": "Surat", "zone": "WR", "state": "Gujarat", "lat": 21.1702, "lon": 72.8311},
    {"code": "BRC", "name": "Vadodara Jn", "zone": "WR", "state": "Gujarat", "lat": 22.3107, "lon": 73.1812},
    {"code": "ADI", "name": "Ahmedabad Jn", "zone": "WR", "state": "Gujarat", "lat": 23.0225, "lon": 72.5714},
    {"code": "KOTA","name": "Kota Jn", "zone": "WCR", "state": "Rajasthan", "lat": 25.2138, "lon": 75.8648},
    {"code": "CNB", "name": "Kanpur Central", "zone": "NCR", "state": "Uttar Pradesh", "lat": 26.4537, "lon": 80.3507},
    {"code": "PRYJ","name": "Prayagraj Jn", "zone": "NCR", "state": "Uttar Pradesh", "lat": 25.4358, "lon": 81.8463},
    {"code": "DDU", "name": "Pt Deen Dayal Upadhyaya", "zone": "ECR", "state": "Uttar Pradesh", "lat": 25.2818, "lon": 83.1189},
    {"code": "BSB", "name": "Varanasi Jn", "zone": "NR", "state": "Uttar Pradesh", "lat": 25.3283, "lon": 82.9866},
    {"code": "HWH", "name": "Howrah Jn", "zone": "ER", "state": "West Bengal", "lat": 22.5830, "lon": 88.3426},
    {"code": "KGP", "name": "Kharagpur Jn", "zone": "SER", "state": "West Bengal", "lat": 22.3396, "lon": 87.3245},
    {"code": "BBS", "name": "Bhubaneswar", "zone": "ECoR", "state": "Odisha", "lat": 20.2676, "lon": 85.8441},
    {"code": "VSKP","name": "Visakhapatnam Jn", "zone": "ECoR", "state": "Andhra Pradesh", "lat": 17.7210, "lon": 83.2922},
    {"code": "TVC", "name": "Thiruvananthapuram Central", "zone": "SR", "state": "Kerala", "lat": 8.4875, "lon": 76.9525},
    {"code": "ERS", "name": "Ernakulam Jn", "zone": "SR", "state": "Kerala", "lat": 9.9678, "lon": 76.2942},
    {"code": "CBE", "name": "Coimbatore Jn", "zone": "SR", "state": "Tamil Nadu", "lat": 11.0016, "lon": 76.9628},
    {"code": "ASR", "name": "Amritsar Jn", "zone": "NR", "state": "Punjab", "lat": 31.6340, "lon": 74.8723},
    {"code": "LDH", "name": "Ludhiana Jn", "zone": "NR", "state": "Punjab", "lat": 30.9010, "lon": 75.8573},
]

# 25 prominent Indian Railways trains across all major corridors
TRAIN_DEFINITIONS = [
    {
        "no": "20607", "name": "Vande Bharat Express", "from": "MGR Chennai Central", "from_code": "MAS",
        "to": "Mysuru Jn", "to_code": "MYS", "type": "Vande Bharat",
        "live": {"cur_code": "KPD", "cur_name": "Katpadi Jn", "delay": 2, "speed": 115.0, "dist_next": 85, "status": "Running", "cong": 0.1, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "MAS", "name": "MGR Chennai Central", "arr": "Starts", "dep": "05:50", "dist": 0, "halt": 0},
            {"code": "KPD", "name": "Katpadi Jn", "arr": "07:13", "dep": "07:15", "dist": 130, "halt": 2},
            {"code": "JTJ", "name": "Jolarpettai Jn", "arr": "08:15", "dep": "08:17", "dist": 214, "halt": 2},
            {"code": "SBC", "name": "KSR Bengaluru City", "arr": "10:15", "dep": "10:20", "dist": 359, "halt": 5},
            {"code": "MYS", "name": "Mysuru Jn", "arr": "12:20", "dep": "Ends", "dist": 497, "halt": 0},
        ]
    },
    {
        "no": "22436", "name": "Vande Bharat Express", "from": "New Delhi", "from_code": "NDLS",
        "to": "Varanasi Jn", "to_code": "BSB", "type": "Vande Bharat",
        "live": {"cur_code": "CNB", "cur_name": "Kanpur Central", "delay": 0, "speed": 128.0, "dist_next": 194, "status": "Running", "cong": 0.12, "weather": 0.05, "sr": False},
        "stops": [
            {"code": "NDLS", "name": "New Delhi", "arr": "Starts", "dep": "06:00", "dist": 0, "halt": 0},
            {"code": "CNB", "name": "Kanpur Central", "arr": "10:08", "dep": "10:10", "dist": 440, "halt": 2},
            {"code": "PRYJ", "name": "Prayagraj Jn", "arr": "12:08", "dep": "12:10", "dist": 634, "halt": 2},
            {"code": "BSB", "name": "Varanasi Jn", "arr": "14:00", "dep": "Ends", "dist": 759, "halt": 0},
        ]
    },
    {
        "no": "12002", "name": "Bhopal Shatabdi Express", "from": "New Delhi", "from_code": "NDLS",
        "to": "Rani Kamlapati", "to_code": "RKMP", "type": "Shatabdi Express",
        "live": {"cur_code": "GWL", "cur_name": "Gwalior Jn", "delay": 6, "speed": 98.0, "dist_next": 98, "status": "Running", "cong": 0.22, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "NDLS", "name": "New Delhi", "arr": "Starts", "dep": "06:00", "dist": 0, "halt": 0},
            {"code": "AGC", "name": "Agra Cantt", "arr": "07:50", "dep": "07:55", "dist": 195, "halt": 5},
            {"code": "GWL", "name": "Gwalior Jn", "arr": "09:23", "dep": "09:28", "dist": 313, "halt": 5},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "10:45", "dep": "10:50", "dist": 411, "halt": 5},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "14:00", "dep": "14:05", "dist": 703, "halt": 5},
            {"code": "RKMP", "name": "Rani Kamlapati", "arr": "14:40", "dep": "Ends", "dist": 709, "halt": 0},
        ]
    },
    {
        "no": "12951", "name": "Mumbai Tejas Rajdhani", "from": "Mumbai Central", "from_code": "MMCT",
        "to": "New Delhi", "to_code": "NDLS", "type": "Rajdhani Express",
        "live": {"cur_code": "BRC", "cur_name": "Vadodara Jn", "delay": 4, "speed": 112.0, "dist_next": 392, "status": "Running", "cong": 0.18, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "MMCT", "name": "Mumbai Central", "arr": "Starts", "dep": "17:00", "dist": 0, "halt": 0},
            {"code": "ST", "name": "Surat", "arr": "19:43", "dep": "19:48", "dist": 263, "halt": 5},
            {"code": "BRC", "name": "Vadodara Jn", "arr": "21:06", "dep": "21:16", "dist": 392, "halt": 10},
            {"code": "KOTA", "name": "Kota Jn", "arr": "03:15", "dep": "03:20", "dist": 920, "halt": 5},
            {"code": "NDLS", "name": "New Delhi", "arr": "08:32", "dep": "Ends", "dist": 1386, "halt": 0},
        ]
    },
    {
        "no": "12301", "name": "Howrah Rajdhani Express", "from": "Howrah Jn", "from_code": "HWH",
        "to": "New Delhi", "to_code": "NDLS", "type": "Rajdhani Express",
        "live": {"cur_code": "PRYJ", "cur_name": "Prayagraj Jn", "delay": 14, "speed": 104.0, "dist_next": 194, "status": "Running", "cong": 0.38, "weather": 0.15, "sr": False},
        "stops": [
            {"code": "HWH", "name": "Howrah Jn", "arr": "Starts", "dep": "16:50", "dist": 0, "halt": 0},
            {"code": "DDU", "name": "Pt Deen Dayal Upadhyaya", "arr": "00:45", "dep": "00:55", "dist": 668, "halt": 10},
            {"code": "PRYJ", "name": "Prayagraj Jn", "arr": "02:43", "dep": "02:45", "dist": 820, "halt": 2},
            {"code": "CNB", "name": "Kanpur Central", "arr": "04:40", "dep": "04:45", "dist": 1014, "halt": 5},
            {"code": "NDLS", "name": "New Delhi", "arr": "10:05", "dep": "Ends", "dist": 1451, "halt": 0},
        ]
    },
    {
        "no": "22691", "name": "Bengaluru Rajdhani Express", "from": "KSR Bengaluru City", "from_code": "SBC",
        "to": "Hazrat Nizamuddin", "to_code": "NZM", "type": "Rajdhani Express",
        "live": {"cur_code": "SC", "cur_name": "Secunderabad Jn", "delay": 8, "speed": 88.0, "dist_next": 132, "status": "Running", "cong": 0.25, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "SBC", "name": "KSR Bengaluru City", "arr": "Starts", "dep": "20:00", "dist": 0, "halt": 0},
            {"code": "SC", "name": "Secunderabad Jn", "arr": "07:05", "dep": "07:15", "dist": 703, "halt": 10},
            {"code": "KZJ", "name": "Kazipet Jn", "arr": "08:50", "dep": "08:52", "dist": 835, "halt": 2},
            {"code": "BPQ", "name": "Balharshah Jn", "arr": "12:15", "dep": "12:20", "dist": 1070, "halt": 5},
            {"code": "NGP", "name": "Nagpur Jn", "arr": "14:55", "dep": "15:00", "dist": 1278, "halt": 5},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "20:55", "dep": "21:00", "dist": 1668, "halt": 5},
            {"code": "NZM", "name": "Hazrat Nizamuddin", "arr": "05:30", "dep": "Ends", "dist": 2365, "halt": 0},
        ]
    },
    {
        "no": "12723", "name": "Telangana Express", "from": "Hyderabad Deccan", "from_code": "HYB",
        "to": "New Delhi", "to_code": "NDLS", "type": "Superfast Express",
        "live": {"cur_code": "WL", "cur_name": "Warangal", "delay": 18, "speed": 62.0, "dist_next": 56, "status": "Running", "cong": 0.35, "weather": 0.1, "sr": False},
        "stops": [
            {"code": "HYB", "name": "Hyderabad Deccan", "arr": "Starts", "dep": "06:00", "dist": 0, "halt": 0},
            {"code": "SC", "name": "Secunderabad Jn", "arr": "06:20", "dep": "06:25", "dist": 9, "halt": 5},
            {"code": "KZJ", "name": "Kazipet Jn", "arr": "08:03", "dep": "08:05", "dist": 141, "halt": 2},
            {"code": "WL", "name": "Warangal", "arr": "08:20", "dep": "08:22", "dist": 151, "halt": 2},
            {"code": "BPQ", "name": "Balharshah Jn", "arr": "12:00", "dep": "12:05", "dist": 394, "halt": 5},
            {"code": "NGP", "name": "Nagpur Jn", "arr": "15:20", "dep": "15:25", "dist": 602, "halt": 5},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "21:45", "dep": "21:55", "dist": 992, "halt": 10},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "01:30", "dep": "01:38", "dist": 1284, "halt": 8},
            {"code": "AGC", "name": "Agra Cantt", "arr": "04:25", "dep": "04:27", "dist": 1500, "halt": 2},
            {"code": "NDLS", "name": "New Delhi", "arr": "07:40", "dep": "Ends", "dist": 1677, "halt": 0},
        ]
    },
    {
        "no": "12724", "name": "Telangana Express (Return)", "from": "New Delhi", "from_code": "NDLS",
        "to": "Hyderabad Deccan", "to_code": "HYB", "type": "Superfast Express",
        "live": {"cur_code": "AGC", "cur_name": "Agra Cantt", "delay": 25, "speed": 75.0, "dist_next": 216, "status": "Running", "cong": 0.42, "weather": 0.2, "sr": True},
        "stops": [
            {"code": "NDLS", "name": "New Delhi", "arr": "Starts", "dep": "16:00", "dist": 0, "halt": 0},
            {"code": "AGC", "name": "Agra Cantt", "arr": "18:45", "dep": "18:47", "dist": 195, "halt": 2},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "21:40", "dep": "21:48", "dist": 411, "halt": 8},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "01:20", "dep": "01:30", "dist": 703, "halt": 10},
            {"code": "NGP", "name": "Nagpur Jn", "arr": "07:10", "dep": "07:15", "dist": 1093, "halt": 5},
            {"code": "BPQ", "name": "Balharshah Jn", "arr": "10:25", "dep": "10:30", "dist": 1301, "halt": 5},
            {"code": "KZJ", "name": "Kazipet Jn", "arr": "13:58", "dep": "14:00", "dist": 1536, "halt": 2},
            {"code": "SC", "name": "Secunderabad Jn", "arr": "15:55", "dep": "16:00", "dist": 1668, "halt": 5},
            {"code": "HYB", "name": "Hyderabad Deccan", "arr": "17:10", "dep": "Ends", "dist": 1677, "halt": 0},
        ]
    },
    {
        "no": "12759", "name": "Charminar Express", "from": "Hyderabad Deccan", "from_code": "HYB",
        "to": "MGR Chennai Central", "to_code": "MAS", "type": "Superfast Express",
        "live": {"cur_code": "KZJ", "cur_name": "Kazipet Jn", "delay": 5, "speed": 85.0, "dist_next": 9, "status": "Running", "cong": 0.15, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "HYB", "name": "Hyderabad Deccan", "arr": "Starts", "dep": "18:00", "dist": 0, "halt": 0},
            {"code": "SC", "name": "Secunderabad Jn", "arr": "18:20", "dep": "18:25", "dist": 9, "halt": 5},
            {"code": "KZJ", "name": "Kazipet Jn", "arr": "20:08", "dep": "20:10", "dist": 141, "halt": 2},
            {"code": "WL", "name": "Warangal", "arr": "20:23", "dep": "20:25", "dist": 151, "halt": 2},
            {"code": "MB", "name": "Mahabubabad", "arr": "21:13", "dep": "21:14", "dist": 211, "halt": 1},
            {"code": "KMT", "name": "Khammam", "arr": "21:49", "dep": "21:50", "dist": 259, "halt": 1},
            {"code": "BZA", "name": "Vijayawada Jn", "arr": "23:45", "dep": "23:55", "dist": 358, "halt": 10},
            {"code": "OGL", "name": "Ongole", "arr": "01:53", "dep": "01:55", "dist": 496, "halt": 2},
            {"code": "NLR", "name": "Nellore", "arr": "03:13", "dep": "03:15", "dist": 613, "halt": 2},
            {"code": "GDR", "name": "Gudur Jn", "arr": "04:18", "dep": "04:20", "dist": 651, "halt": 2},
            {"code": "MAS", "name": "MGR Chennai Central", "arr": "07:00", "dep": "Ends", "dist": 789, "halt": 0},
        ]
    },
    {
        "no": "17201", "name": "Golconda Express", "from": "Secunderabad Jn", "from_code": "SC",
        "to": "Guntur Jn", "to_code": "GNT", "type": "Express",
        "live": {"cur_code": "BZA", "cur_name": "Vijayawada Jn", "delay": 32, "speed": 0.0, "dist_next": 32, "status": "Halted", "cong": 0.60, "weather": 0.25, "sr": True},
        "stops": [
            {"code": "SC", "name": "Secunderabad Jn", "arr": "Starts", "dep": "12:30", "dist": 0, "halt": 0},
            {"code": "KZJ", "name": "Kazipet Jn", "arr": "14:40", "dep": "14:42", "dist": 132, "halt": 2},
            {"code": "WL", "name": "Warangal", "arr": "14:55", "dep": "14:57", "dist": 142, "halt": 2},
            {"code": "MB", "name": "Mahabubabad", "arr": "15:45", "dep": "15:46", "dist": 202, "halt": 1},
            {"code": "KMT", "name": "Khammam", "arr": "16:28", "dep": "16:30", "dist": 249, "halt": 2},
            {"code": "BZA", "name": "Vijayawada Jn", "arr": "18:45", "dep": "18:55", "dist": 349, "halt": 10},
            {"code": "GNT", "name": "Guntur Jn", "arr": "20:00", "dep": "Ends", "dist": 381, "halt": 0},
        ]
    },
    {
        "no": "12841", "name": "Coromandel Express", "from": "Howrah Jn", "from_code": "HWH",
        "to": "MGR Chennai Central", "to_code": "MAS", "type": "Superfast Express",
        "live": {"cur_code": "VSKP", "cur_name": "Visakhapatnam Jn", "delay": 0, "speed": 102.0, "dist_next": 349, "status": "Running", "cong": 0.15, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "HWH", "name": "Howrah Jn", "arr": "Starts", "dep": "15:20", "dist": 0, "halt": 0},
            {"code": "KGP", "name": "Kharagpur Jn", "arr": "16:50", "dep": "16:55", "dist": 115, "halt": 5},
            {"code": "BBS", "name": "Bhubaneswar", "arr": "21:40", "dep": "21:45", "dist": 437, "halt": 5},
            {"code": "VSKP", "name": "Visakhapatnam Jn", "arr": "04:25", "dep": "04:45", "dist": 880, "halt": 20},
            {"code": "BZA", "name": "Vijayawada Jn", "arr": "10:10", "dep": "10:20", "dist": 1229, "halt": 10},
            {"code": "OGL", "name": "Ongole", "arr": "12:13", "dep": "12:15", "dist": 1367, "halt": 2},
            {"code": "MAS", "name": "MGR Chennai Central", "arr": "16:50", "dep": "Ends", "dist": 1661, "halt": 0},
        ]
    },
    {
        "no": "12615", "name": "Grand Trunk (GT) Express", "from": "MGR Chennai Central", "from_code": "MAS",
        "to": "New Delhi", "to_code": "NDLS", "type": "Superfast Express",
        "live": {"cur_code": "NGP", "cur_name": "Nagpur Jn", "delay": 12, "speed": 82.0, "dist_next": 390, "status": "Running", "cong": 0.28, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "MAS", "name": "MGR Chennai Central", "arr": "Starts", "dep": "18:50", "dist": 0, "halt": 0},
            {"code": "GDR", "name": "Gudur Jn", "arr": "20:58", "dep": "21:00", "dist": 138, "halt": 2},
            {"code": "NLR", "name": "Nellore", "arr": "21:28", "dep": "21:30", "dist": 176, "halt": 2},
            {"code": "OGL", "name": "Ongole", "arr": "22:58", "dep": "23:00", "dist": 293, "halt": 2},
            {"code": "BZA", "name": "Vijayawada Jn", "arr": "01:25", "dep": "01:35", "dist": 431, "halt": 10},
            {"code": "WL", "name": "Warangal", "arr": "04:23", "dep": "04:25", "dist": 638, "halt": 2},
            {"code": "BPQ", "name": "Balharshah Jn", "arr": "08:40", "dep": "08:45", "dist": 881, "halt": 5},
            {"code": "NGP", "name": "Nagpur Jn", "arr": "11:50", "dep": "11:55", "dist": 1090, "halt": 5},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "18:20", "dep": "18:30", "dist": 1479, "halt": 10},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "22:50", "dep": "22:58", "dist": 1771, "halt": 8},
            {"code": "AGC", "name": "Agra Cantt", "arr": "01:50", "dep": "01:55", "dist": 1987, "halt": 5},
            {"code": "NDLS", "name": "New Delhi", "arr": "06:35", "dep": "Ends", "dist": 2182, "halt": 0},
        ]
    },
    {
        "no": "12626", "name": "Kerala Express", "from": "New Delhi", "from_code": "NDLS",
        "to": "Thiruvananthapuram Central", "to_code": "TVC", "type": "Superfast Express",
        "live": {"cur_code": "ET", "cur_name": "Itarsi Jn", "delay": 22, "speed": 74.0, "dist_next": 298, "status": "Running", "cong": 0.40, "weather": 0.15, "sr": False},
        "stops": [
            {"code": "NDLS", "name": "New Delhi", "arr": "Starts", "dep": "20:10", "dist": 0, "halt": 0},
            {"code": "AGC", "name": "Agra Cantt", "arr": "22:20", "dep": "22:25", "dist": 195, "halt": 5},
            {"code": "GWL", "name": "Gwalior Jn", "arr": "23:45", "dep": "23:47", "dist": 313, "halt": 2},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "01:30", "dep": "01:38", "dist": 411, "halt": 8},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "05:20", "dep": "05:25", "dist": 703, "halt": 5},
            {"code": "ET", "name": "Itarsi Jn", "arr": "07:05", "dep": "07:15", "dist": 795, "halt": 10},
            {"code": "NGP", "name": "Nagpur Jn", "arr": "11:45", "dep": "11:50", "dist": 1093, "halt": 5},
            {"code": "CBE", "name": "Coimbatore Jn", "arr": "07:10", "dep": "07:15", "dist": 2362, "halt": 5},
            {"code": "ERS", "name": "Ernakulam Jn", "arr": "10:30", "dep": "10:35", "dist": 2591, "halt": 5},
            {"code": "TVC", "name": "Thiruvananthapuram Central", "arr": "15:00", "dep": "Ends", "dist": 2810, "halt": 0},
        ]
    },
    {
        "no": "12245", "name": "Howrah - Yesvantpur Duronto", "from": "Howrah Jn", "from_code": "HWH",
        "to": "Yesvantpur Jn", "to_code": "YPR", "type": "Duronto Express",
        "live": {"cur_code": "BBS", "cur_name": "Bhubaneswar", "delay": 0, "speed": 118.0, "dist_next": 443, "status": "Running", "cong": 0.08, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "HWH", "name": "Howrah Jn", "arr": "Starts", "dep": "10:50", "dist": 0, "halt": 0},
            {"code": "BBS", "name": "Bhubaneswar", "arr": "16:20", "dep": "16:30", "dist": 437, "halt": 10},
            {"code": "VSKP", "name": "Visakhapatnam Jn", "arr": "22:00", "dep": "22:20", "dist": 880, "halt": 20},
            {"code": "BZA", "name": "Vijayawada Jn", "arr": "04:15", "dep": "04:25", "dist": 1229, "halt": 10},
            {"code": "YPR", "name": "Yesvantpur Jn", "arr": "16:00", "dep": "Ends", "dist": 1947, "halt": 0},
        ]
    },
    {
        "no": "12431", "name": "Trivandrum Rajdhani", "from": "Thiruvananthapuram Central", "from_code": "TVC",
        "to": "Hazrat Nizamuddin", "to_code": "NZM", "type": "Rajdhani Express",
        "live": {"cur_code": "ERS", "cur_name": "Ernakulam Jn", "delay": 7, "speed": 95.0, "dist_next": 450, "status": "Running", "cong": 0.20, "weather": 0.1, "sr": False},
        "stops": [
            {"code": "TVC", "name": "Thiruvananthapuram Central", "arr": "Starts", "dep": "19:15", "dist": 0, "halt": 0},
            {"code": "ERS", "name": "Ernakulam Jn", "arr": "22:30", "dep": "22:35", "dist": 206, "halt": 5},
            {"code": "PUNE", "name": "Pune Jn", "arr": "18:00", "dep": "18:05", "dist": 1780, "halt": 5},
            {"code": "BRC", "name": "Vadodara Jn", "arr": "01:10", "dep": "01:20", "dist": 2263, "halt": 10},
            {"code": "KOTA", "name": "Kota Jn", "arr": "06:45", "dep": "06:50", "dist": 2791, "halt": 5},
            {"code": "NZM", "name": "Hazrat Nizamuddin", "arr": "12:40", "dep": "Ends", "dist": 3149, "halt": 0},
        ]
    },
    {
        "no": "12137", "name": "Punjab Mail", "from": "Mumbai CSMT", "from_code": "CSMT",
        "to": "Firozpur Cantt", "to_code": "NDLS", "type": "Superfast Express",
        "live": {"cur_code": "ET", "cur_name": "Itarsi Jn", "delay": 15, "speed": 68.0, "dist_next": 92, "status": "Running", "cong": 0.32, "weather": 0.05, "sr": False},
        "stops": [
            {"code": "CSMT", "name": "Mumbai CSMT", "arr": "Starts", "dep": "19:35", "dist": 0, "halt": 0},
            {"code": "ET", "name": "Itarsi Jn", "arr": "07:50", "dep": "08:00", "dist": 744, "halt": 10},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "09:30", "dep": "09:35", "dist": 836, "halt": 5},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "14:15", "dep": "14:23", "dist": 1128, "halt": 8},
            {"code": "AGC", "name": "Agra Cantt", "arr": "17:50", "dep": "17:55", "dist": 1344, "halt": 5},
            {"code": "NDLS", "name": "New Delhi", "arr": "21:30", "dep": "Ends", "dist": 1539, "halt": 0},
        ]
    },
    {
        "no": "12009", "name": "Mumbai - Ahmedabad Shatabdi", "from": "Mumbai Central", "from_code": "MMCT",
        "to": "Ahmedabad Jn", "to_code": "ADI", "type": "Shatabdi Express",
        "live": {"cur_code": "ST", "cur_name": "Surat", "delay": 3, "speed": 120.0, "dist_next": 129, "status": "Running", "cong": 0.14, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "MMCT", "name": "Mumbai Central", "arr": "Starts", "dep": "06:20", "dist": 0, "halt": 0},
            {"code": "ST", "name": "Surat", "arr": "09:20", "dep": "09:23", "dist": 263, "halt": 3},
            {"code": "BRC", "name": "Vadodara Jn", "arr": "10:49", "dep": "10:52", "dist": 392, "halt": 3},
            {"code": "ADI", "name": "Ahmedabad Jn", "arr": "12:45", "dep": "Ends", "dist": 491, "halt": 0},
        ]
    },
    {
        "no": "12925", "name": "Paschim Express", "from": "Mumbai Central", "from_code": "MMCT",
        "to": "Amritsar Jn", "to_code": "ASR", "type": "Superfast Express",
        "live": {"cur_code": "KOTA", "cur_name": "Kota Jn", "delay": 45, "speed": 0.0, "dist_next": 466, "status": "Halted", "cong": 0.65, "weather": 0.3, "sr": True},
        "stops": [
            {"code": "MMCT", "name": "Mumbai Central", "arr": "Starts", "dep": "11:25", "dist": 0, "halt": 0},
            {"code": "ST", "name": "Surat", "arr": "15:47", "dep": "15:52", "dist": 263, "halt": 5},
            {"code": "BRC", "name": "Vadodara Jn", "arr": "17:40", "dep": "17:50", "dist": 392, "halt": 10},
            {"code": "KOTA", "name": "Kota Jn", "arr": "01:45", "dep": "01:55", "dist": 920, "halt": 10},
            {"code": "NDLS", "name": "New Delhi", "arr": "10:40", "dep": "11:05", "dist": 1386, "halt": 25},
            {"code": "LDH", "name": "Ludhiana Jn", "arr": "16:20", "dep": "16:30", "dist": 1698, "halt": 10},
            {"code": "ASR", "name": "Amritsar Jn", "arr": "20:05", "dep": "Ends", "dist": 1834, "halt": 0},
        ]
    },
    {
        "no": "12649", "name": "Karnataka Sampark Kranti", "from": "Yesvantpur Jn", "from_code": "YPR",
        "to": "Hazrat Nizamuddin", "to_code": "NZM", "type": "Superfast Express",
        "live": {"cur_code": "BPQ", "cur_name": "Balharshah Jn", "delay": 16, "speed": 78.0, "dist_next": 208, "status": "Running", "cong": 0.30, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "YPR", "name": "Yesvantpur Jn", "arr": "Starts", "dep": "13:50", "dist": 0, "halt": 0},
            {"code": "SC", "name": "Secunderabad Jn", "arr": "08:15", "dep": "08:25", "dist": 712, "halt": 10},
            {"code": "KZJ", "name": "Kazipet Jn", "arr": "10:18", "dep": "10:20", "dist": 844, "halt": 2},
            {"code": "BPQ", "name": "Balharshah Jn", "arr": "13:50", "dep": "13:55", "dist": 1079, "halt": 5},
            {"code": "NGP", "name": "Nagpur Jn", "arr": "17:15", "dep": "17:20", "dist": 1287, "halt": 5},
            {"code": "BPL", "name": "Bhopal Jn", "arr": "23:10", "dep": "23:20", "dist": 1677, "halt": 10},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "03:10", "dep": "03:18", "dist": 1969, "halt": 8},
            {"code": "NZM", "name": "Hazrat Nizamuddin", "arr": "09:15", "dep": "Ends", "dist": 2374, "halt": 0},
        ]
    },
    {
        "no": "12801", "name": "Purushottam Express", "from": "Puri", "from_code": "HWH",
        "to": "New Delhi", "to_code": "NDLS", "type": "Superfast Express",
        "live": {"cur_code": "CNB", "cur_name": "Kanpur Central", "delay": 35, "speed": 52.0, "dist_next": 440, "status": "Running", "cong": 0.55, "weather": 0.2, "sr": True},
        "stops": [
            {"code": "BBS", "name": "Bhubaneswar", "arr": "Starts", "dep": "22:55", "dist": 0, "halt": 0},
            {"code": "KGP", "name": "Kharagpur Jn", "arr": "03:45", "dep": "03:50", "dist": 322, "halt": 5},
            {"code": "DDU", "name": "Pt Deen Dayal Upadhyaya", "arr": "16:45", "dep": "16:55", "dist": 990, "halt": 10},
            {"code": "PRYJ", "name": "Prayagraj Jn", "arr": "19:20", "dep": "19:30", "dist": 1142, "halt": 10},
            {"code": "CNB", "name": "Kanpur Central", "arr": "22:00", "dep": "22:10", "dist": 1336, "halt": 10},
            {"code": "NDLS", "name": "New Delhi", "arr": "04:00", "dep": "Ends", "dist": 1776, "halt": 0},
        ]
    },
    {
        "no": "12269", "name": "Chennai Duronto Express", "from": "MGR Chennai Central", "from_code": "MAS",
        "to": "Hazrat Nizamuddin", "to_code": "NZM", "type": "Duronto Express",
        "live": {"cur_code": "BZA", "cur_name": "Vijayawada Jn", "delay": 0, "speed": 110.0, "dist_next": 659, "status": "Running", "cong": 0.05, "weather": 0.0, "sr": False},
        "stops": [
            {"code": "MAS", "name": "MGR Chennai Central", "arr": "Starts", "dep": "06:35", "dist": 0, "halt": 0},
            {"code": "BZA", "name": "Vijayawada Jn", "arr": "12:00", "dep": "12:10", "dist": 431, "halt": 10},
            {"code": "BPQ", "name": "Balharshah Jn", "arr": "18:00", "dep": "18:05", "dist": 881, "halt": 5},
            {"code": "NGP", "name": "Nagpur Jn", "arr": "20:40", "dep": "20:45", "dist": 1090, "halt": 5},
            {"code": "VGLJ", "name": "Virangana Lakshmibai", "arr": "05:25", "dep": "05:30", "dist": 1771, "halt": 5},
            {"code": "NZM", "name": "Hazrat Nizamuddin", "arr": "10:40", "dep": "Ends", "dist": 2174, "halt": 0},
        ]
    }
]


def seed_database():
    db = SessionLocal()
    try:
        # Clear existing data
        db.query(DelayHistory).delete()
        db.query(LiveStatus).delete()
        db.query(Schedule).delete()
        db.query(Station).delete()
        db.query(Train).delete()
        db.commit()

        # 1. Insert Stations
        station_map = {}
        for s in ALL_STATIONS:
            st = Station(
                station_code=s["code"],
                station_name=s["name"],
                zone=s["zone"],
                state=s["state"],
                latitude=s["lat"],
                longitude=s["lon"]
            )
            db.add(st)
            station_map[s["code"]] = st
        db.flush()

        # 2. Insert Trains, Schedules, LiveStatus, DelayHistory
        now_str = datetime.now().strftime("%I:%M %p")

        for t_data in TRAIN_DEFINITIONS:
            train = Train(
                train_no=t_data["no"],
                train_name=t_data["name"],
                from_station=t_data["from"],
                from_code=t_data["from_code"],
                to_station=t_data["to"],
                to_code=t_data["to_code"],
                train_type=t_data["type"],
                is_active=True
            )
            db.add(train)
            db.flush()

            # Schedules
            for idx, stop in enumerate(t_data["stops"], start=1):
                sch = Schedule(
                    train_id=train.id,
                    station_code=stop["code"],
                    station_name=stop["name"],
                    arrival_time=stop["arr"],
                    departure_time=stop["dep"],
                    stop_number=idx,
                    distance_from_origin=float(stop["dist"]),
                    avg_halt_minutes=stop.get("halt", 2)
                )
                db.add(sch)

            # Live Status
            live = t_data["live"]
            ls = LiveStatus(
                train_id=train.id,
                current_station_code=live["cur_code"],
                current_station_name=live["cur_name"],
                current_delay_minutes=live["delay"],
                current_speed_kmh=float(live["speed"]),
                distance_to_next_station=float(live["dist_next"]),
                status=live["status"],
                last_updated=now_str,
                track_congestion=live["cong"],
                weather_factor=live["weather"],
                speed_restriction=live["sr"]
            )
            db.add(ls)

            # Delay History (30 days of realistic history for each train)
            causes = [
                "Signal Clearance", "Freight Train Precedence", "Permanent Way Speed Restriction",
                "Late Arrival of Inbound Crew", "Interlocking Yard Congestion", "Minor Loco Defect",
                "Dense Fog Precaution", None
            ]
            for d_offset in range(30):
                hist_date = (datetime.now() - timedelta(days=d_offset)).strftime("%Y-%m-%d")
                base_delay = live["delay"] + random.randint(-5, 8)
                base_delay = max(0, base_delay)
                # Sample 2-4 stations per day
                for stop in t_data["stops"][:4]:
                    dh = DelayHistory(
                        train_no=t_data["no"],
                        station_code=stop["code"],
                        date=hist_date,
                        scheduled_arrival=stop["arr"] if stop["arr"] != "Starts" else stop["dep"],
                        actual_arrival=stop["arr"] if stop["arr"] != "Starts" else stop["dep"],
                        delay_minutes=max(0, base_delay + random.randint(-4, 4)),
                        cause=random.choice(causes)
                    )
                    db.add(dh)

        db.commit()
        print(f"✅ Successfully seeded {len(TRAIN_DEFINITIONS)} trains with full schedules & live status!")
    except Exception as e:
        db.rollback()
        print(f"❌ Seed error: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
    seed_database()
