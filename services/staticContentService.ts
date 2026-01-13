// Static content service - No API required
import { Section, SectionKey } from '../types';

// Static documentation content
const STATIC_CONTENT: Record<SectionKey, { content: string; sources: Array<{ title: string; uri: string }> }> = {
  introduction: {
    content: `# Introduction to Claude Cowork

Claude Cowork is Anthropic's first agentic AI product designed for non-technical office tasks. It brings the powerful automation capabilities of Claude Code into everyday office scenarios, allowing users to directly operate local files, coordinate sub-agents, and complete complex cross-application tasks through Claude Desktop.

## What is Claude Cowork?

Claude Cowork transforms Claude from a conversational AI into an **action-first AI office agent**. Instead of just chatting, Claude can now:

- **Plan** complex multi-step tasks
- **Execute** work inside a secure local environment  
- **Deliver** finished artifacts directly to your folders

## Key Benefits

- **No coding required** - Describe outcomes in plain language
- **Local file access** - Works directly with your authorized folders
- **Professional output** - Generates Excel, PowerPoint, and Word documents
- **Long-running tasks** - Handles extended workflows without timeouts

## Who Can Use It?

Currently available as a Research Preview for:
- **macOS users** with Claude Desktop
- **Claude Max subscribers**

Get started by upgrading to Claude Max and enabling Cowork in Claude Desktop settings.`,
    sources: [
      {
        title: 'Claude Cowork Official Introduction',
        uri: 'https://www.youtube.com/watch?v=UAmKyyZ-b9E'
      }
    ]
  },
  installation: {
    content: `# Installation Guide

## Prerequisites

Before installing Claude Cowork, ensure you have:

1. **macOS** (required for Research Preview)
2. **Claude Desktop** application installed
3. **Claude Max subscription** (active)

## Step-by-Step Installation

### Step 1: Install Claude Desktop

1. Visit the [Claude Desktop download page](https://claude.ai/download)
2. Download the macOS version
3. Open the downloaded file and drag Claude Desktop to your Applications folder

### Step 2: Upgrade to Claude Max

1. Open Claude Desktop
2. Navigate to Settings → Subscription
3. Upgrade to Claude Max if you haven't already

### Step 3: Enable Cowork

1. Open Claude Desktop Settings
2. Navigate to Features → Cowork
3. Toggle "Enable Claude Cowork" to ON
4. Grant necessary file access permissions when prompted

### Step 4: Verify Installation

1. Start a new conversation in Claude Desktop
2. Look for the Cowork icon in the interface
3. Try a simple command like "Create a test document in my Documents folder"

## Troubleshooting

If you encounter issues:

- **Permission errors**: Check System Preferences → Security & Privacy → Files and Folders
- **Subscription issues**: Verify your Claude Max subscription status
- **Feature not appearing**: Ensure you're using the latest version of Claude Desktop`,
    sources: []
  },
  authentication: {
    content: `# Authentication & Security

## How Authentication Works

Claude Cowork uses your Claude Desktop authentication, which is tied to your Anthropic account and Claude Max subscription.

## Security Model

### VM Isolation

All Cowork operations run inside a **dedicated virtual machine**, ensuring:

- Your system files remain protected
- Clear boundaries between AI automation and your core environment
- Complete isolation from your personal data

### User Control

You maintain full control:

- **Scoped access**: Grant only the folders Cowork needs for specific tasks
- **Real-time oversight**: Monitor every action before it executes
- **Intervention capability**: Pause or stop operations at any time

## File Access Permissions

When you first use Cowork, you'll be prompted to authorize folder access:

1. Choose specific folders to grant access
2. Review the permission request carefully
3. Grant access only to folders needed for your current task

## Best Practices

- **Start small**: Begin with a single folder for testing
- **Review permissions**: Regularly check which folders have access
- **Revoke when needed**: Remove access from folders you no longer use with Cowork`,
    sources: []
  },
  basicUsage: {
    content: `# Basic Usage

## Getting Started

Claude Cowork works through natural language commands in Claude Desktop. Here's how to use it:

## Basic Workflow

### 1. Set Your Goal

Describe what you want to accomplish in plain language:

\`\`\`
"Create a summary document of all PDF files in my Research folder"
\`\`\`

### 2. Review the Plan

Claude will show you a step-by-step plan before execution:

- **Plan**: Break down the goal into sub-tasks
- **Review**: Check each step before approval
- **Modify**: Request changes if needed

### 3. Execute Securely

Once approved, Claude executes the plan:

- Operations run in an isolated VM
- You can monitor progress in real-time
- Pause or intervene at any point

### 4. Receive Results

Finished files appear in your authorized folders, ready to use.

## Common Commands

### File Organization
\`\`\`
"Organize all images in my Downloads folder by date"
\`\`\`

### Document Creation
\`\`\`
"Create a PowerPoint presentation summarizing my Q4 sales data"
\`\`\`

### Data Analysis
\`\`\`
"Analyze all CSV files in my Data folder and create a summary report"
\`\`\`

## Tips for Best Results

- **Be specific**: Clear goals lead to better outcomes
- **Start simple**: Begin with straightforward tasks
- **Review plans**: Always check the execution plan before approval`,
    sources: [
      {
        title: 'Claude Cowork User Test Experience & Feedback',
        uri: 'https://www.youtube.com/watch?v=KLzcqt9fIus'
      }
    ]
  },
  advancedFeatures: {
    content: `# Advanced Features

## Sub-Agent Collaboration

Claude Cowork can break complex goals into parallel sub-tasks, with multiple agents working simultaneously:

### How It Works

1. **Task Decomposition**: Claude analyzes your goal and identifies independent sub-tasks
2. **Parallel Execution**: Multiple sub-agents work on different parts simultaneously
3. **Result Aggregation**: All results are combined into the final deliverable

### Example Use Case

\`\`\`
"Research the top 5 competitors in the AI space and create a comparison report"
\`\`\`

This might create sub-agents for:
- Researching each competitor
- Gathering market data
- Formatting the final report

## Professional Format Support

### Excel Spreadsheets

- Native Excel format (.xlsx)
- Formula support
- Chart generation
- Data analysis functions

### PowerPoint Presentations

- Professional slide layouts
- Image integration
- Consistent formatting
- Template support

### Word Documents

- Proper formatting
- Table support
- Image embedding
- Style consistency

## Long-Running Tasks

Cowork is designed for extended workflows:

- **No session timeouts**: Tasks can run for hours
- **Progress tracking**: Monitor long operations
- **Resume capability**: Continue interrupted tasks
- **Background execution**: Keep working while Cowork processes

## Custom Workflows

Create reusable workflows for common tasks:

1. Define a workflow template
2. Save it for future use
3. Apply to similar tasks with different inputs`,
    sources: []
  },
  troubleshooting: {
    content: `# Troubleshooting

## Common Issues and Solutions

### Cowork Feature Not Appearing

**Problem**: The Cowork option doesn't show in Claude Desktop

**Solutions**:
- Verify you have an active Claude Max subscription
- Update Claude Desktop to the latest version
- Restart Claude Desktop
- Check Settings → Features → Cowork is enabled

### Permission Denied Errors

**Problem**: Cowork can't access your files

**Solutions**:
- Check macOS System Preferences → Security & Privacy → Files and Folders
- Ensure Claude Desktop has permission for the folders you're using
- Re-authorize folder access in Claude Desktop settings

### Tasks Failing to Execute

**Problem**: Plans are created but execution fails

**Solutions**:
- Review the execution plan for any issues
- Check that all required folders are authorized
- Verify file formats are supported
- Try breaking the task into smaller steps

### Slow Performance

**Problem**: Tasks take longer than expected

**Solutions**:
- Large file operations naturally take time
- Check your system resources (CPU, memory)
- Consider breaking complex tasks into smaller chunks
- Ensure stable internet connection

### VM Errors

**Problem**: Virtual machine related errors

**Solutions**:
- Restart Claude Desktop
- Check available disk space (VM needs space to operate)
- Update macOS to the latest version
- Contact support if issues persist

## Getting Help

If you continue to experience issues:

1. Check the [official documentation](https://claude.ai/docs)
2. Visit the [community forum](https://community.anthropic.com)
3. Contact Anthropic support

## Best Practices

- **Start with simple tasks** to familiarize yourself
- **Review plans carefully** before execution
- **Grant minimal permissions** initially
- **Monitor first executions** closely
- **Keep backups** of important files`,
    sources: []
  }
};

export async function fetchSectionContent(
  sectionId: SectionKey, 
  sectionTitle: string
): Promise<{ content: string; sources: Array<{ title: string; uri: string }> }> {
  // Return static content immediately - no API call needed
  return STATIC_CONTENT[sectionId] || {
    content: `# ${sectionTitle}\n\nContent for this section is being prepared.`,
    sources: []
  };
}

export async function searchDocumentation(query: string): Promise<string> {
  // Simple local search through static content
  const results: string[] = [];
  
  Object.entries(STATIC_CONTENT).forEach(([key, data]) => {
    const contentLower = data.content.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (contentLower.includes(queryLower)) {
      // Extract relevant snippet
      const index = contentLower.indexOf(queryLower);
      const snippet = data.content.substring(
        Math.max(0, index - 100),
        Math.min(data.content.length, index + query.length + 200)
      );
      results.push(`## ${key}\n\n...${snippet}...`);
    }
  });
  
  if (results.length === 0) {
    return `No results found for "${query}". Try searching for: installation, authentication, usage, features, or troubleshooting.`;
  }
  
  return results.join('\n\n---\n\n');
}

