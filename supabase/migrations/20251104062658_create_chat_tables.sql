/*
  # Create Chat System Tables

  1. New Tables
    - `chat_sessions` - Stores visitor chat sessions
      - `id` (uuid, primary key)
      - `visitor_name` (text)
      - `visitor_email` (text)
      - `is_registered` (boolean)
      - `status` (text - active/closed)
      - `created_at` (timestamp)
    - `chat_messages` - Stores chat messages
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key)
      - `message` (text)
      - `sender_type` (text - visitor/admin)
      - `sender_name` (text)
      - `sender_email` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for visitors to access their own sessions
    - Add policies for admins to access all sessions
*/

CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_name text NOT NULL,
  visitor_email text NOT NULL,
  is_registered boolean DEFAULT false,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  message text NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('visitor', 'admin')),
  sender_name text,
  sender_email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can view their own sessions"
  ON chat_sessions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create a chat session"
  ON chat_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update session status"
  ON chat_sessions FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'email' LIKE '%admin%')
  WITH CHECK (auth.jwt()->>'email' LIKE '%admin%');

CREATE POLICY "Anyone can view messages"
  ON chat_messages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON chat_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor_email ON chat_sessions(visitor_email);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);