from google import genai
from dotenv import load_dotenv

load_dotenv()
from google.genai import types
import os

# Initialize Gemini 3 Client
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

def run_budget_audit(ticketing_stream_data, previous_signature=None):
    """
    Analyzes 4 months of 'cashier tokens' to track Operating Ratio targets.
    Utilizes Thought Signatures to maintain state across the quarter.
    """
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp",
        contents=[
            "Analyze these quarterly cashier tokens for Operating Expenses (Fuel/Traffic) "
            "and Parliament Loan Recovery targets.",
            types.Part.from_bytes(data=ticketing_stream_data, mime_type="text/csv")
        ],
        config=types.GenerateContentConfig(
            system_instruction="""
            You are a Gemini 3.0 Autonomous Agent acting as an Auditor for the US Federal Railroad Administration (FRA).
            Your architecture is built on the Gemini 3.0 Agentic Framework, designed for high-precision regulatory oversight.
            Your role is to audit railway financial data against US Federal Standards (49 CFR) and Congressional Budget Office targets.

            Analyze the input CSV data stream (containing timestamps, route types like 'NEC-HighSpeed', revenue, etc.).
            
            Compute the following Key Performance Indicators (KPIs):
            1. **Operating Ratio**: (Total Working Expenses / Gross Traffic Receipts) * 100.
               - Target: The US Congress target for this fiscal year is 95.0%.
            2. **Operating Ratio Gap**: Difference between Actual Operating Ratio and Target (95.0%).
            3. **Compliance Status**: Check if Fuel Index meets EPA Tier 4 standards and if Overtime is within FRA Hours of Service limits.
               - If compliant, return "FRA Compliant".
               - If not, cite the specific 49 CFR part violation.

            Output PURE JSON matching the schema. No markdown formatting.
            """,
            # Feature 3: Grounding to verify against live Parliamentary Appropriation Bills
            tools=[types.Tool(google_search=types.GoogleSearch())],
            # Feature 4: Structured Output for the React Dashboard
            response_mime_type="application/json",
            response_schema={
                "type": "OBJECT",
                "properties": {
                    "operating_ratio": {"type": "NUMBER"},
                    "fuel_expense_variance": {"type": "STRING"},
                    "loan_recovery_status": {"type": "STRING"},
                    "gross_traffic_receipts": {"type": "NUMBER"},
                    "total_working_expenses": {"type": "NUMBER"},
                    "operating_ratio_gap": {"type": "NUMBER"},
                    "compliance_status": {"type": "STRING"},
                    "thought_signature": {"type": "STRING"} # To pass back to frontend
                }
            }
        )
    )
    return response

# Note: Media Resolution: High is triggered automatically when processing 
# high-fidelity document scans or physical receipts.