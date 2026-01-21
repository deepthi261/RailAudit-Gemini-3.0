import csv
import random
from datetime import datetime, timedelta

def generate_row(scenario, current_time):
    # Base values
    route_types = ['NEC-Acela', 'NEC-Regional', 'LongDistance-Empire', 'State-PacificSurfliner', 'Commuter-Metra']
    route = random.choice(route_types)
    
    # Defaults
    compliance = "OK"
    revenue = random.uniform(100000, 180000)
    subsidy = random.uniform(30000, 60000)
    wages = random.uniform(35000, 50000)
    fuel = random.uniform(10000, 20000)
    loan = 5000.0
    
    # 1. Compliant Scenario (Good OR, Low Expenses)
    if scenario == 'compliant':
        compliance = "OK"
        # High revenue, lower costs
        revenue = random.uniform(140000, 200000)
        fuel = random.uniform(12000, 18000) 

    # 2. High Expense Scenario (Bad OR)
    elif scenario == 'high_expense':
        compliance = "WARNING_HIGH_OT" if random.random() > 0.3 else "OK"
        # Lower revenue, huge wages/overtime
        revenue = random.uniform(80000, 120000)
        wages = random.uniform(80000, 110000) # Crew overtime lines
        fuel = random.uniform(25000, 40000)

    # 3. Fuel Violation (Tier 4 Issues)
    elif scenario == 'fuel':
        compliance = "TIER_4_VIOLATION"
        route = "Legacy-Diesel-Route-707"
        fuel = random.uniform(50000, 70000) # Inefficient burn
        
    return [
        current_time.strftime("%Y-%m-%dT%H:%M:%S"),
        route,
        round(revenue, 2),
        round(subsidy, 2),
        round(wages, 2),
        round(fuel, 2),
        round(loan, 2),
        compliance
    ]

def generate_file(filename, scenario, rows=1200):
    print(f"Generating {filename} ({rows} rows)...")
    start_time = datetime(2025, 1, 1, 8, 0, 0)
    
    with open(filename, 'w', newline='') as f:
        writer = csv.writer(f)
        # Header
        writer.writerow(['timestamp','route_id','ticket_revenue','state_subsidy','crew_wages','fuel_costs','loan_payment','compliance_status'])
        
        for i in range(rows):
            current_time = start_time + timedelta(minutes=15*i)
            writer.writerow(generate_row(scenario, current_time))
            
    print(f"Done: {filename}")

if __name__ == "__main__":
    generate_file('datasets/dataset_1_compliant.csv', 'compliant', 1500)
    generate_file('datasets/dataset_2_high_expense.csv', 'high_expense', 1500)
    generate_file('datasets/dataset_3_fuel_violation.csv', 'fuel', 1500)
